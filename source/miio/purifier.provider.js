import miio from 'miio';
import {log} from '../utils/log-util';
import Config from '../config'

let purifier = null;
const setPurifier = device => purifier = device;
const getPurifier = () => purifier;

log('[miio] connecting to purifier');

miio.device({address: Config.PURIFIER_ADDRESS})
    .then(device => setPurifier(device) && log('[miio] connected to', purifier.type))
    .catch(error => log('[miio] error connecting to purifier', error));

module.exports = {
    getPurifier: getPurifier
};