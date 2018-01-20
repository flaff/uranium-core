const
    axios = require('axios'),
    UrlUtil = require('../utils/url-util'),
    Config = require('../config'),

    AIR_API_URL = 'http://api.waqi.info/',
    FEED_URL = 'feed/{{params}}/?token={{token}}',
    STATION_COORDS_PARAMS = 'geo:{{latitude}};{{longitude}}',
    STATION_ID_PARAMS = '@{{idx}}',

    AIR_API_TIMEOUT = 10000,

    AIR_API_CONFIG = {
        baseURL: AIR_API_URL,
        timeout: AIR_API_TIMEOUT
    },

    AirAPI = axios.create(AIR_API_CONFIG);

function getByCoordinates(latitude, longitude, token) {
    return AirAPI.get(UrlUtil.setParams(FEED_URL, {
        params: STATION_COORDS_PARAMS,
        latitude: latitude || Config.AQICN_LATITUDE,
        longitude: longitude || Config.AQICN_LONGITUDE,
        token: token || Config.AQICN_TOKEN
    }));
}

const validate = response => {
    if (response.data.status === 'error') {
        throw new Error(response.data.data);
    }
    return true;
};

function fetch(idx = Config.AQICN_STATION_IDX, token = Config.AQICN_TOKEN) {
    return AirAPI.get(UrlUtil.setParams(FEED_URL, {
        params: STATION_ID_PARAMS,
        idx, token
    }))
}


module.exports = {
    fetch: fetch,
    validate: validate
};
