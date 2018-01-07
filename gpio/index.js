const GPIOModel = require('./gpio.model');
const momentUtil = require('./../utils/moment-util');
const logUtil = require('./../utils/log-util');
const config = require('./../config');

const gpios = [];

const HttpStatus = {
    ACCEPTED: 202,
    NOT_MODIFIED: 304,
    NOT_FOUND: 404
};

gpios.push(new GPIOModel(17));
gpios.push(new GPIOModel(27));
gpios.push(new GPIOModel(22));

function getGPIOById(id) {
    for (var i = 0; i < gpios.length; i++) {
        if (gpios[i].id === id) {
            return gpios[i];
        }
    }
}

gpios[0].addCycle(+momentUtil.getTimeFromString('09:00'), +momentUtil.getTimeFromString('17:00'));

function cycleCheckGPIOs() {
    const time = momentUtil.getCurrentTime();
    for (var i = 0; i < gpios.length; i++) {
        gpios[i].cycleCheck(time);
    }
}

function updateGPIOsByLegacyApi(legacyGPIOsResponse) {
    const data = legacyGPIOsResponse.data;
    for (var i = 0; i < gpios.length; i++) {
        if (gpios[i].value !== !!+data[gpios[i].id].value) {
            logUtil.log('[gpio] updating', gpios[i].id, gpios[i].value, '->', !!+data[gpios[i].id].value);
            gpios[i].updateLegacy(data[gpios[i].id]);
        }
    }
}

function registerGPIOApi(app) {
    app.get('/api/gpio', function (request, response) {
        logUtil.log('[gpio]', request.url);
        response.send(gpios);
    });

    app.post('/api/gpio', function (request, response) {
        const gpio = getGPIOById(request.body.id),
            status = gpio ?
                (request.body.value === gpio.value ?
                    HttpStatus.NOT_MODIFIED : HttpStatus.ACCEPTED) : HttpStatus.NOT_FOUND;

        logUtil.log('[gpio]', request.url, request.body, '->', status);

        gpio && gpio.setValue(request.body.value);
        response.sendStatus(status);
    });
}

cycleCheckGPIOs();
setInterval(cycleCheckGPIOs, config.cycleInterval);

module.exports = {
    cycleCheckGPIOs: cycleCheckGPIOs,
    updateGPIOsByLegacyApi: updateGPIOsByLegacyApi,
    registerGPIOApi: registerGPIOApi
};