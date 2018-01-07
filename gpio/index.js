const GPIOModel = require('./gpio.model');
const momentUtil = require('./../utils/moment-util');
const logUtil = require('./../utils/log-util');

const gpios = [];

gpios.push(new GPIOModel(17));
gpios.push(new GPIOModel(27));
gpios.push(new GPIOModel(22));

gpios[0].addCycle(+momentUtil.getTimeFromString('09:00'), +momentUtil.getTimeFromString('17:00'));

function cycleCheckGPIOs() {
    const time = +momentUtil.getCurrentTime();
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
}

setInterval(cycleCheckGPIOs, 1000);

module.exports = {
    cycleCheckGPIOs: cycleCheckGPIOs,
    updateGPIOsByLegacyApi: updateGPIOsByLegacyApi,
    registerGPIOApi: registerGPIOApi
};