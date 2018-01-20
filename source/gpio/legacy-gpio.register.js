const gpioProxy = require('./legacy-gpio.proxy.js');
const proxyUtil = require('../utils/proxy-util.js');
const logUtil = require('../utils/log-util');
const gpio = require('./index');

function registerLegacyGPIO (app) {
    logUtil.log('[gpio-legacy] registering module');

    function logFail(response) {
        logUtil.log('[gpio-legacy] FAIL ', response);
    }

    app.get('/GPIO/*', function (request, response) {
        gpioProxy.getAllGPIOs('get')
            .then(proxyUtil.proxyRequest(response, gpio.updateGPIOsByLegacyApi))
            .catch(proxyUtil.proxyRequestFailHandler(response, logFail))
    });

    ['get', 'post'].forEach(function (method) {
        logUtil.log('[gpio-legacy] registering method', method);
        app[method](/\/GPIO\/*/, function (request, response) {
            gpioProxy.genericGPIOProxy(method, request.url)
                .then(proxyUtil.proxyRequest(response))
                .catch(proxyUtil.proxyRequestFailHandler(response, logFail))
        });
    });

    logUtil.log('[gpio-legacy] updating cache');
    gpioProxy.getAllGPIOs('get')
        .then(gpio.updateGPIOsByLegacyApi)
        .catch(function () {});
};

module.exports = {
    register: registerLegacyGPIO
};
