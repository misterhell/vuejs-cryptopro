// import Cryptopro from './index.js'
// import './cadesplugin_api'
import cryptoConstants from './constants'
import Certificate from './certificate'
import cryptoCommon from './common'



const CheckFileApi = () => new Promise((resolve, reject) => {
    // Проверяем, работает ли File API
    if (window.FileReader) {
        // Браузер поддерживает File API.
    } else {
        reject('The File APIs are not fully supported in this browser.');
    }
    const fileReader = new FileReader();
    if (typeof (fileReader.readAsDataURL) != 'function') {
        reject('Method readAsDataURL() is not supported in FileReader.');
        return false;
    }

    resolve()
})


const ReadFile = (file) => new Promise((resolve, reject) => {
    CheckFileApi()
        .then(() => {
            let oFReader = new FileReader();
            oFReader.readAsDataURL(file);

            oFReader.onload = function (oFREvent) {
                let header = ';base64,';
                let FileData = oFREvent.target.result;
                let Base64Data = FileData.substr(FileData.indexOf(header) + header.length);
                resolve(Base64Data)
            };
        })
        .catch(err => reject(err))
})

export const checkPlugin = async () => {
    await importPlugin()
    return window.cadesplugin
}

export const importPlugin = () => {

    return import('./cadesplugin_api')

    // асинхронная загрузка
    // return import('./cadesplugin_api')
    //     .then(() => {
    //         const loaded = () => {
    //             console.log('plugin loaded');
    //             return true
    //         }

    //         const onError = () => {
    //             e => console.log(e)
    //             return false
    //         }

    //         return window.cadesplugin.then(loaded, onError)
    //     })
    //     .catch(e => console.log(e))
}

/**
 * resolve возвращает список сертификатов
 * @returns {*|Promise|Promise<unknown>|Promise}
 */
export const getCertsList = async () => {
    await checkPlugin()

    return new Promise((resolve, reject) => {
        // аргументы в функцию
        const args = { resolve, reject }


        const fn = function* (args) {
            // парсим аргументы
            const { resolve, reject } = args[0]


            let oStore = yield cadesplugin.CreateObjectAsync('CAdESCOM.Store')

            let result = [],
                certs,
                count,
                item;

            // Открываем хранилище
            try {
                yield oStore.Open(
                    cadesplugin.CAPICOM_CURRENT_USER_STORE,
                    cadesplugin.CAPICOM_MY_STORE,
                    cadesplugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED
                );
            } catch (err) {
                reject(`Ошибка при открытии хранилища: ${err.message}`);
                return;
            }

            // Получаем доступ к сертификатам
            try {
                certs = yield oStore.Certificates;

                if (certs) {
                    certs = yield certs.Find(cadesplugin.CAPICOM_CERTIFICATE_FIND_TIME_VALID);
                    /**
                     * Не рассматриваются сертификаты, в которых отсутствует закрытый ключ
                     * или не действительны на данный момент
                     * */
                    certs = yield certs.Find(
                        cadesplugin.CAPICOM_CERTIFICATE_FIND_EXTENDED_PROPERTY,
                        cryptoConstants.PropId.CAPICOM_PROPID_KEY_PROV_INFO
                    );

                    count = yield certs.Count;
                }
            } catch (err) {
                reject(`Ошибка получения списка сертификатов: ${err.message}`);
                return;
            }

            if (!count) {
                reject('Нет доступных сертификатов');
                return;
            }

            try {
                while (count) {
                    item = yield certs.Item(count);

                    result.push(new Certificate({
                        _cert: yield item,
                        thumbprint: yield item.Thumbprint,
                        subjectName: yield item.SubjectName,
                        issuerName: yield item.IssuerName,
                        validFrom: yield item.ValidFromDate,
                        validTo: yield item.ValidToDate
                    }));

                    count--;
                }
            } catch (err) {
                reject(`Ошибка обработки сертификатов: ${err.message}`);
                return;
            }

            oStore.Close();

            const _certListCache = cryptoCommon.prepareCertsInfo(result);

            resolve(_certListCache);

        }


        cadesplugin.async_spawn(fn, args)

    })
}

/**
 * @param keyThumb - thumbprint сертификата
 * @param dataToSign
 * @returns {Promise<unknown>} {signedMessage, hashedVal}
 * @constructor
 */
export const SignStringHash = (keyThumb, dataToSign) => {
    return new Promise(function (resolve, reject) {
        cadesplugin.async_spawn(function* (args) {
            try {
                // открытие хранилища
                let oStore = yield cadesplugin.CreateObjectAsync('CAdESCOM.Store');
                yield oStore.Open(cadesplugin.CAPICOM_CURRENT_USER_STORE, cadesplugin.CAPICOM_MY_STORE,
                    cadesplugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED);

                // поиск сертификата по его хешу (thumbprint)
                let CertificatesObj = yield oStore.Certificates;
                let oCertificates = yield CertificatesObj.Find(
                    cadesplugin.CAPICOM_CERTIFICATE_FIND_SHA1_HASH, keyThumb);

                let Count = yield oCertificates.Count;
                if (Count == 0) {
                    throw (`Сертификат не найден:  ${args[0]}`);
                }

                // устустановка сертификата
                let oCertificate = yield oCertificates.Item(1);
                let oSigner = yield cadesplugin.CreateObjectAsync('CAdESCOM.CPSigner');
                yield oSigner.propset_Certificate(oCertificate);


                // вычисление хеша
                let oHashedData = yield cadesplugin.CreateObjectAsync('CAdESCOM.HashedData');

                yield oHashedData.propset_Algorithm(cadesplugin.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_256);
                yield oHashedData.Hash(dataToSign);

                let hashedVal = yield oHashedData.Value;

                let oSignedData = yield cadesplugin.CreateObjectAsync('CAdESCOM.CadesSignedData');

                let sSignedMessage = yield oSignedData.SignHash(oHashedData, oSigner, cadesplugin.CADESCOM_CADES_BES);


                // проверка подписи
                let oSignedData2 = yield cadesplugin.CreateObjectAsync('CAdESCOM.CadesSignedData');


                let oHashedData2 = yield cadesplugin.CreateObjectAsync('CAdESCOM.HashedData');
                // Инициализируем объект заранее вычисленным хэш-значением
                // Алгоритм хэширования нужно указать до того, как будет передано хэш-значение
                yield oHashedData2.propset_Algorithm = cadesplugin.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_256;
                yield oHashedData2.SetHashValue(hashedVal);

                // Проверяем подпись
                try {
                    yield oSignedData2.VerifyHash(oHashedData, sSignedMessage, cadesplugin.CADESCOM_CADES_BES);
                } catch (err) {
                    alert('Не получилось проверить созданную подпись: ' + cadesplugin.getLastError(err));
                    return false;
                }


                yield oStore.Close();

                args[2]({ signedMessage: sSignedMessage, hashedVal: hashedVal });
            } catch (err) {
                args[3]('Failed to create signature. Error: ' + cadesplugin.getLastError(err));
            }
        }, keyThumb, dataToSign, resolve, reject);
    })
}


/**
 *
 * @param thumb
 * @param dataInBase64
 * @param signType bool - false - connected
 * @returns {*|Promise|Promise<unknown>|Promise}
 * @constructor
 */
export const SignData = (thumb, dataInBase64, signType) => Cryptopro.call('signData', thumb, dataInBase64, signType)


export const SignFile = (keyThumb, file) => {
    return new Promise(function (resolve, reject) {
        ReadFile(file)
            .then(Base64Data => {
                cadesplugin.async_spawn(function* (args) {
                    try {
                        // открытие хранилища
                        let oStore = yield cadesplugin.CreateObjectAsync('CAdESCOM.Store');
                        yield oStore.Open(cadesplugin.CAPICOM_CURRENT_USER_STORE, cadesplugin.CAPICOM_MY_STORE,
                            cadesplugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED);

                        // поиск сертификата по его хешу (thumbprint)
                        let CertificatesObj = yield oStore.Certificates;
                        let oCertificates = yield CertificatesObj.Find(
                            cadesplugin.CAPICOM_CERTIFICATE_FIND_SHA1_HASH, keyThumb);

                        let Count = yield oCertificates.Count;
                        if (Count == 0) {
                            throw ('Certificate not found: ' + args[0]);
                        }
                        // устустановка сертификата
                        let oCertificate = yield oCertificates.Item(1);
                        let oSigner = yield cadesplugin.CreateObjectAsync('CAdESCOM.CPSigner');
                        yield oSigner.propset_Certificate(oCertificate);

                        // вычисление хеша
                        let oHashedData = yield cadesplugin.CreateObjectAsync('CAdESCOM.HashedData');

                        yield oHashedData.propset_Algorithm(cadesplugin.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_256);
                        // yield oHashedData.propset_DataEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY);
                        yield oHashedData.Hash(Base64Data);


                        let hashedVal = yield oHashedData.Value;

                        let oSignedData = yield cadesplugin.CreateObjectAsync('CAdESCOM.CadesSignedData');

                        let sSignedMessage = yield oSignedData.SignHash(oHashedData, oSigner, cadesplugin.CADESCOM_CADES_BES);




                        // проверка подписи
                        let oSignedData2 = yield cadesplugin.CreateObjectAsync('CAdESCOM.CadesSignedData');


                        let oHashedData2 = yield cadesplugin.CreateObjectAsync('CAdESCOM.HashedData');
                        // Инициализируем объект заранее вычисленным хэш-значением
                        // Алгоритм хэширования нужно указать до того, как будет передано хэш-значение
                        yield oHashedData2.propset_Algorithm = cadesplugin.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_256;
                        yield oHashedData2.SetHashValue(hashedVal);

                        // Проверяем подпись
                        try {
                            yield oSignedData2.VerifyHash(oHashedData, sSignedMessage, cadesplugin.CADESCOM_CADES_BES);
                        } catch (err) {
                            alert(`Не получилось проверить созданную подпись: ${cadesplugin.getLastError(err)}`);
                            return false;
                        }

                        args[2](sSignedMessage);
                    } catch (err) {
                        args[3](`Failed to create signature. Error:  ${cadesplugin.getLastError(err)}`);
                    }
                }, keyThumb, file, resolve, reject);
            })
            .catch(err => reject(err))
    })

}









