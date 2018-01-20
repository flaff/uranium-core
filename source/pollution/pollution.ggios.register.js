const Pollution = require('./pollution.ggios');

function register(app) {
    app.get('/api/pollution', function (request, response) {

    });
}

module.exports = {
    register: register
};