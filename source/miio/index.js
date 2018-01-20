import {log} from '../utils/log-util';
import * as Provider from './purifier.provider';
import * as Fragment from './purifier.fragment';

const HttpStatus = {
    NOT_FOUND: 404
};

const finalizeRequest = (response, purifier = Provider.getPurifier()) => {
    if (purifier) {
        response.send(Fragment.create(purifier));
    } else {
        response.sendStatus(HttpStatus.NOT_FOUND);
    }
};

function register(app) {
    log('[miio] registering purifier module');
    app.get('/api/purifier', function (request, response) {
        const purifier = Provider.getPurifier();

        log('[miio] requested /purifier');
        finalizeRequest(response, purifier);
    });

    app.post('/api/purifier/power', (request, response) => {
        const
            purifier = Provider.getPurifier(),
            power = request.body.power;

        log('[miio] requested /purifier/power', power);
        purifier && purifier.setPower(power)
            .then(() => finalizeRequest(response, purifier))
            .catch(err => log('[miio] power', err));

        !purifier && finalizeRequest(response, purifier);
    });

    app.post('/api/purifier/mode', (request, response) => {
        const
            purifier = Provider.getPurifier(),
            mode = request.body.mode;

        log('[miio] requested /purifier/mode', mode);
        purifier && purifier.setMode(mode)
            .then(() => finalizeRequest(response, purifier))
            .catch(err => log('[miio] mode', err));

        !purifier && finalizeRequest(response, purifier);
    });

    app.post('/api/purifier/favorite', (request, response) => {
        const
            purifier = Provider.getPurifier(),
            favorite = +request.body.favorite;

        log('[miio] requested /purifier/favorite', favorite);

        purifier && purifier.setFavoriteLevel(favorite)
            .then(() => finalizeRequest(response, purifier))
            .catch(err => log('[miio] favorite', err));

        !purifier && finalizeRequest(response, purifier);
    });
}

export const getFragment = () => Provider.purifier ? Fragment.create(Provider.purifier) : null;

module.exports = {
    register: register,
    getFragment: getFragment
};
