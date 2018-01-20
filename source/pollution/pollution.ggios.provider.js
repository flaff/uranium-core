const axios = require('axios'),
    UrlUtil = require('../utils/url-util'),
    LogUtil = require('../utils/log-util'),

    AIR_API_URL = 'http://api.gios.gov.pl/pjp-api/rest/',
    INDEX_URL = 'aqindex/getIndex/{{station}}',
    SENSORS_URL = 'station/sensors/{{station}}',
    ALL_STATIONS_URL = 'station/findAll',

    AIR_API_TIMEOUT = 10000,

    AIR_API_CONFIG = {
        baseURL: AIR_API_URL,
        timeout: AIR_API_TIMEOUT
    },

    AirAPI = axios.create(AIR_API_CONFIG);


function getAllStations() {
    return AirAPI.get(ALL_STATIONS_URL);
}


function getStationIndexes(station) {
    return AirAPI.get(UrlUtil.setParams(INDEX_URL, {station: station}));
}

function getStationSensors(station) {
    return AirAPI.get(UrlUtil.setParams(SENSORS_URL, {station: station}));
}


AirAPI.interceptors.request.use(function (request) {
    //LogUtil.log('[AIR] Request', request);
    return request;
});

AirAPI.interceptors.request.use(function (respose) {
    //LogUtil.log('[AIR] Response', respose);
    return respose;
});

module.exports = {
    getAllStations: getAllStations,
    getStationIndexes: getStationIndexes,
    getStationSensors: getStationSensors
};
