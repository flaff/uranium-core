import {log} from '../utils/log-util';
import * as Config from '../config';
import * as Provider from './pollution.aqicn.provider';
import * as Fragment from './pollution.aqicn.fragment';
import * as Cache from './pollution.aqicn.cache';

const update = () => Provider.fetch()
    .then(r => Cache.update(Fragment.create(r)) && log('[pollution] cache updated'))
    .catch(error => log('[pollution] ERROR fetch', error));

update();
setInterval(update, Config.POLLUTION_UPDATE_INTERVAL);

export const get = () => Cache.get();
