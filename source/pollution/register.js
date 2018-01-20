import {get} from './pollution.aqicn';
import {log} from '../utils/log-util';

const register = (app) => {
    log('[pollution] registering module');
    app.get('/api/pollution', (req, res) => res.send(get()));
};

module.exports = {
    register: register
};