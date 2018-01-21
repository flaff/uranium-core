import miio from 'miio';
import {log} from '../utils/log-util';
import Config from '../config'

let purifier = null;
const setPurifier = device => purifier = device;
const getPurifier = () => purifier;

log('[miio] connecting to purifier');

miio.browse();

const connect = () => miio.device({address: Config.PURIFIER_ADDRESS, connectTimeout: Config.MIIO_CONNECT_TIMEOUT})
    .then(device => setPurifier(device) && log('[miio] connected to', purifier.type))
    .catch(error => log('[miio] error connecting to purifier', error) && setTimeout(connect, Config.MIIO_RETRY_TIME));

connect();

module.exports = {
    getPurifier: getPurifier
};