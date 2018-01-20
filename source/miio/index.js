import {log} from '../utils/log-util';
import * as Provider from './purifier.provider';
import * as Fragment from './purifier.fragment';

const HttpStatus = {
    NOT_FOUND: 404
};

function register(app) {
    log('[miio] registering purifier module');
    app.get('/api/purifier', function (request, response) {
        const purifier = Provider.getPurifier();

        log('[miio] requested /purifier');

        if (purifier) {
            response.send(Fragment.create(purifier));
        } else {
            response.sendStatus(HttpStatus.NOT_FOUND);
        }
    });
}

export const getFragment = () => Provider.purifier ? Fragment.create(Provider.purifier) : null;

module.exports = {
    register: register,
    getFragment: getFragment
};
