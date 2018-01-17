const Provider = require('./purifier.provider');
const Fragment = require('./purifier.fragment');
const Logger = require('./../utils/log-util');

const HttpStatus = {
    NOT_FOUND: 404
};

function register(app) {
    Logger.log('[miio] registering purifier module');
    app.get('/purifier', function (request, response) {
        const purifier = Provider.getPurifier();

        Logger.log('[miio] requested /purifier', purifier);

        if (purifier) {
            response.send(Fragment.create(purifier));
        } else {
            response.sendStatus(HttpStatus.NOT_FOUND);
        }
    });
}

function getFragment() {
    return Provider.purifier ? Fragment.create(Provider.purifier) : null;
}

module.exports = {
    register: register,
    getFragment: getFragment
};
