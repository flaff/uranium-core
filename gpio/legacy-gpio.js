var gpio = require('./proxy.js');
const proxyUtil = require('../utils/proxy-util.js');
const logUtil = require('./../utils/log-util');

module.exports = function registerLegacyGPIO (app) {
    logUtil.log('[gpio-legacy] registering module');

    ['get', 'post'].forEach(function (method) {
        logUtil.log('[gpio-legacy] registering method', method);
        app[method](/\/GPIO\/*/, function (request, response) {
            gpio.genericGPIOProxy(method, request.url)
                .then(proxyUtil.proxyRequest(response))
                .catch(proxyUtil.proxyRequest(response))
        });
    });
};
