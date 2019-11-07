export default {
    // CAPICOM_STORE_LOCATION enumeration
    StoreLocation: {
        CAPICOM_MEMORY_STORE: 0,
        CAPICOM_LOCAL_MACHINE_STORE: 1,
        CAPICOM_CURRENT_USER_STORE: 2,
        CAPICOM_ACTIVE_DIRECTORY_USER_STORE: 3,
        CAPICOM_SMART_CARD_USER_STORE: 4
    },
    // CAPICOM_STORE_OPEN_MODE enumeration
    StoreOpenMode: {
        CAPICOM_STORE_OPEN_READ_ONLY: 0,
        CAPICOM_STORE_OPEN_READ_WRITE: 1,
        CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED: 2,
        CAPICOM_STORE_OPEN_EXISTING_ONLY: 128,
        CAPICOM_STORE_OPEN_INCLUDE_ARCHIVED: 256
    },
    // CAPICOM_CERTIFICATE_FIND_TYPE enumeration
    CertFindType: {
        CAPICOM_CERTIFICATE_FIND_SHA1_HASH: 0,
        CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME: 1,
        CAPICOM_CERTIFICATE_FIND_ISSUER_NAME: 2,
        CAPICOM_CERTIFICATE_FIND_ROOT_NAME: 3,
        CAPICOM_CERTIFICATE_FIND_TEMPLATE_NAME: 4,
        CAPICOM_CERTIFICATE_FIND_EXTENSION: 5,
        CAPICOM_CERTIFICATE_FIND_EXTENDED_PROPERTY: 6,
        CAPICOM_CERTIFICATE_FIND_APPLICATION_POLICY: 7,
        CAPICOM_CERTIFICATE_FIND_CERTIFICATE_POLICY: 8,
        CAPICOM_CERTIFICATE_FIND_TIME_VALID: 9,
        CAPICOM_CERTIFICATE_FIND_TIME_NOT_YET_VALID: 10,
        CAPICOM_CERTIFICATE_FIND_TIME_EXPIRED: 11,
        CAPICOM_CERTIFICATE_FIND_KEY_USAGE: 12
    },
    Time: {
        AUTHENTICATED_ATTRIBUTE_SIGNING_TIME: 0
    },
    Check: {
        CHECK_NONE: 0,
        CHECK_TRUSTED_ROOT: 1,
        CHECK_TIME_VALIDITY: 2,
        CHECK_SIGNATURE_VALIDITY: 4,
        CHECK_ONLINE_REVOCATION_STATUS: 8,
        CHECK_OFFLINE_REVOCATION_STATUS: 16,
        TRUST_IS_NOT_TIME_VALID: 1,
        TRUST_IS_NOT_TIME_NESTED: 2,
        TRUST_IS_REVOKED: 4,
        TRUST_IS_NOT_SIGNATURE_VALID: 8,
        TRUST_IS_NOT_VALID_FOR_USAGE: 16,
        TRUST_IS_UNTRUSTED_ROOT: 32,
        TRUST_REVOCATION_STATUS_UNKNOWN: 64,
        TRUST_IS_CYCLIC: 128,
        TRUST_IS_PARTIAL_CHAIN: 65536,
        TRUST_CTL_IS_NOT_TIME_VALID: 131072,
        TRUST_CTL_IS_NOT_SIGNATURE_VALID: 262144,
        TRUST_CTL_IS_NOT_VALID_FOR_USAGE: 524288,
    },
    // CAPICOM_PROPID enumeration
    PropId: {
        CAPICOM_PROPID_UNKNOWN: 0,
        CAPICOM_PROPID_KEY_PROV_HANDLE: 1,
        CAPICOM_PROPID_KEY_PROV_INFO: 2,
        CAPICOM_PROPID_SHA1_HASH: 3,
        CAPICOM_PROPID_HASH_PROP: 3,
        CAPICOM_PROPID_MD5_HASH: 4,
        CAPICOM_PROPID_KEY_CONTEXT: 5,
        CAPICOM_PROPID_KEY_SPEC: 6,
        CAPICOM_PROPID_IE30_RESERVED: 7,
        CAPICOM_PROPID_PUBKEY_HASH_RESERVED: 8,
        CAPICOM_PROPID_ENHKEY_USAGE: 9,
        CAPICOM_PROPID_CTL_USAGE: 9,
        CAPICOM_PROPID_NEXT_UPDATE_LOCATION: 10,
        CAPICOM_PROPID_FRIENDLY_NAME: 11,
        CAPICOM_PROPID_PVK_FILE: 12,
        CAPICOM_PROPID_DESCRIPTION: 13,
        CAPICOM_PROPID_ACCESS_STATE: 14,
        CAPICOM_PROPID_SIGNATURE_HASH: 15,
        CAPICOM_PROPID_SMART_CARD_DATA: 16,
        CAPICOM_PROPID_EFS: 17,
        CAPICOM_PROPID_FORTEZZA_DATA: 18,
        CAPICOM_PROPID_ARCHIVED: 19,
        CAPICOM_PROPID_KEY_IDENTIFIER: 20,
        CAPICOM_PROPID_AUTO_ENROLL: 21,
        CAPICOM_PROPID_PUBKEY_ALG_PARA: 22,
        CAPICOM_PROPID_CROSS_CERT_DIST_POINTS: 23,
        CAPICOM_PROPID_ISSUER_PUBLIC_KEY_MD5_HASH: 24,
        CAPICOM_PROPID_SUBJECT_PUBLIC_KEY_MD5_HASH: 25,
        CAPICOM_PROPID_ENROLLMENT: 26,
        CAPICOM_PROPID_DATE_STAMP: 27,
        CAPICOM_PROPID_ISSUER_SERIAL_NUMBER_MD5_HASH: 28,
        CAPICOM_PROPID_SUBJECT_NAME_MD5_HASH: 29,
        CAPICOM_PROPID_EXTENDED_ERROR_INFO: 30,
        CAPICOM_PROPID_RENEWAL: 64,
        CAPICOM_PROPID_ARCHIVED_KEY_HASH: 65,
        CAPICOM_PROPID_FIRST_RESERVED: 66,
        CAPICOM_PROPID_LAST_RESERVED: 0x00007FFF,
        CAPICOM_PROPID_FIRST_USER: 0x00008000,
        CAPICOM_PROPID_LAST_USER: 0x0000FFFF
    },
    // CADESCOM_XML_SIGNATURE_TYPE enumeration
    SignatureType: {
        CADESCOM_XML_SIGNATURE_TYPE_ENVELOPED: 0,
        CADESCOM_XML_SIGNATURE_TYPE_ENVELOPING: 1,
        CADESCOM_XML_SIGNATURE_TYPE_TEMPLATE: 2
    },
    // CADESCOM_HASH_ALGORITHM enumeration
    HashAlgorithm: {
        CADESCOM_HASH_ALGORITHM_CP_GOST_3411: 100,
        CADESCOM_HASH_ALGORITHM_MD2: 1,
        CADESCOM_HASH_ALGORITHM_MD4: 2,
        CADESCOM_HASH_ALGORITHM_MD5: 3,
        CADESCOM_HASH_ALGORITHM_SHA_256: 4,
        CADESCOM_HASH_ALGORITHM_SHA_384: 5,
        CADESCOM_HASH_ALGORITHM_SHA_512: 6,
        CADESCOM_HASH_ALGORITHM_SHA1: 0
    },
    CadesType: {
        CADESCOM_CADES_DEFAULT: 0,
        CADESCOM_CADES_BES: 1,
        CADESCOM_CADES_X_LONG_TYPE_1: 0x5d
    },
    ContentEncoding: {
        CADESCOM_BASE64_TO_BINARY: 0x01,
        CADESCOM_STRING_TO_UCS2LE: 0x00
    },
    StoreNames: {
        CAPICOM_MY_STORE: 'My'
    },
    Chain: {
        CAPICOM_CERTIFICATE_INCLUDE_CHAIN_EXCEPT_ROOT: 0,
        CAPICOM_CERTIFICATE_INCLUDE_WHOLE_CHAIN: 1,
        CAPICOM_CERTIFICATE_INCLUDE_END_ENTITY_ONLY: 2
    },
    GostXmlDSigUrls: {
        XmlDsigGost3410Url: 'urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr34102001-gostr3411',
        XmlDsigGost3411Url: 'urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr3411',
        XmlDsigGost3410UrlObsolete: 'http://www.w3.org/2001/04/xmldsig-more#gostr34102001-gostr3411',
        XmlDsigGost3411UrlObsolete: 'http://www.w3.org/2001/04/xmldsig-more#gostr3411'
    }
};