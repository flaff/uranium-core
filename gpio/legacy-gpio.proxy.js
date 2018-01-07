const logUtil = require('./../utils/log-util');
const config = require('./../config');

const
    urlUtil = require('../utils/url-util.js'),
    axios = require('axios'),

    GPIO_API_URL = config.legacyAPIAddress + '/',
    GPIO_API_TIMEOUT = 10000,

    GPIO_API_CONFIG = {
        baseURL: GPIO_API_URL,
        timeout: GPIO_API_TIMEOUT
    },

    GpioAPI = axios.create(GPIO_API_CONFIG),

    GPIO_GET_ALL_URL = 'GPIO/*',
    GPIO_VALUE_GET_URL = 'GPIO/{{gpio}}/value',
    GPIO_VALUE_SET_URL = 'GPIO/{{gpio}}/value/{{value}}';

GpioAPI.interceptors.request.use(function (request) {
    logUtil.log('[gpio-proxy]', request.method, request.url, request.data || '<none>');
    return request;
});

function genericGPIOProxy(method, url, params) {
    return GpioAPI[method](url, params);
}

function getAllGPIOs() {
    return GpioAPI.get(urlUtil.setURLParams(GPIO_GET_ALL_URL));
}

function setGPIOValue(gpio, value) {
    return GpioAPI.post(urlUtil.setURLParams(GPIO_VALUE_SET_URL, {gpio: gpio, value: value}));
}

function getGPIOValue(gpio) {
    return GpioAPI.post(urlUtil.setURLParams(GPIO_VALUE_GET_URL, {gpio: gpio}));
}

function GPIO(gpio) {
    this.set = function(value) {
        setGPIOValue(gpio, value);
    };
    this.get = function () {
        getGPIOValue(gpio);
    };
}

module.exports = {
    genericGPIOProxy: genericGPIOProxy,
    getAllGPIOs: getAllGPIOs,
    setGPIOValue: setGPIOValue,
    getGPIOValue: getGPIOValue,
    GPIO: GPIO
};