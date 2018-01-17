const Pollution = require('./pollution');

function register(app) {
    app.get('/pollution/stations', function (request, response) {

    });

    app.get('/pollution/stations/:station', function (request, response) {
        response.send(Pollution.getStationInfo(request.params.id));
    });
}

module.exports = {
    register: register
};