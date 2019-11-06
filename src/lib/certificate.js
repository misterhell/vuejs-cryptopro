export default class Certificate {
    constructor (item) {
        this._cert = item._cert;
        this.thumbprint = item.thumbprint;
        this.subjectName = item.subjectName;
        this.issuerName = item.issuerName;
        this.validFrom = item.validFrom;
        this.validTo = item.validTo;
    }


    isValid () {
        var cert = this._cert;
    
        return new Promise(function (resolve, reject) {
            eval(cryptoCommon.generateAsyncFn(function isValid() {
                var result;
    
                try {
                    result = 'yield' + cert.IsValid();
                    result = 'yield' + result.Result;
                } catch (err) {
                    reject('Ошибка при проверке сертификата: ', err.message);
                    return;
                }
    
                resolve(result);
            }));
        });
    };
    
    /**
     * Достает указанное свойство у сертификата
     * */
    getProp (propName) {
        var cert = this._cert;
    
        return new Promise(function (resolve, reject) {
            eval(cryptoCommon.generateAsyncFn(function getProp() {
                var result;
    
                try {
                    result = 'yield' + cert[propName];
                } catch (err) {
                    reject('Ошибка при обращении к свойству сертификата: ', err.message);
                    return;
                }
    
                resolve(result);
            }));
        });
    };
    
    /**
     * Экспорт base64 представления сертификата пользователя
     * */
    exportBase64 () {
        var cert = this._cert;
    
        return new Promise(function (resolve, reject) {
            eval(cryptoCommon.generateAsyncFn(function exportBase64() {
                var base64;
    
                try {
                    base64 = 'yield' + cert.Export(0);
                } catch (err) {
                    reject('Ошибка при экспорте сертификата: ', err.message);
                    return;
                }
    
                resolve(base64);
            }));
        });
    };
    
    /**
     * Возвращает информацию об алгоритме
     * */
    getAlgorithm () {
        var cert = this._cert;
    
        return new Promise(function (resolve, reject) {
            eval(cryptoCommon.generateAsyncFn(function getAlgorithm() {
                var result = {},
                    algorithm;
    
                try {
                    algorithm = 'yield' + cert.PublicKey();
                    algorithm = 'yield' + algorithm.Algorithm;
    
                    result.algorithm = 'yield' + algorithm.FriendlyName;
                    result.oid = 'yield' + algorithm.Value;
                } catch (err) {
                    reject('Ошибка при получении алгоритма: ', err.message);
                    return;
                }
    
                resolve(result);
            }));
        });
    };
    
    /**
     * Разбирает SubjectName сертификата по тэгам
     * */
    getOwnerInfo () {
        return getCertInfo.call(this, cryptoCommon.subjectNameTagsTranslations, 'SubjectName');
    };
    
    /**
     * Разбирает IssuerName сертификата по тэгам
     * */
    getIssuerInfo () {
        return getCertInfo.call(this, cryptoCommon.issuerNameTagsTranslations, 'IssuerName');
    };
    
    /**
     * Получение OID сертификата
     *
     * @returns {Array} Возвращает массив OID (улучшенного ключа)
     * */
    getExtendedKeyUsage () {
        var cert = this._cert;
    
        return new Promise(function (resolve, reject) {
            eval(cryptoCommon.generateAsyncFn(function getExtendedKeyUsage() {
                var OIDS = [],
                    count,
                    item;
    
                try {
                    count = 'yield' + cert.ExtendedKeyUsage();
                    count = 'yield' + count.EKUs;
                    count = 'yield' + count.Count;
    
                    if (count > 0) {
                        while (count > 0) {
                            item = 'yield' + cert.ExtendedKeyUsage();
                            item = 'yield' + item.EKUs;
                            item = 'yield' + item.Item(count);
                            item = 'yield' + item.OID;
    
                            OIDS.push(item);
    
                            count--;
                        }
                    }
                } catch (err) {
                    reject('Ошибка при получении ОИД\'ов: ', err.message);
                    return;
                }
    
                resolve(OIDS);
            }));
        });
    };
}