const
    miio = require('miio'),
    Logger = require('./../utils/log-util'),
    config = require('./../config');

var purifier = null;

function getPurifier() {
    return purifier;
}

Logger.log('[miio] connecting to purifier');
miio.device({address: config.PURIFIER_ADDRESS})
    .then(function (device) {
        purifier = device;
        Logger.log('[miio] connected to', purifier.type);
    })
    .catch(function (error) {
        Logger.log('[miio] error connecting to purifier', error);
    });

module.exports = {
    getPurifier: getPurifier
};