"use strict";
const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config.js');
const logUtil = require('./utils/log-util.js');

const registerLegacyGPIOMethods = require('./gpio/legacy-gpio.register');
const registerPollutionMethods = require('./pollution/pollution.register');
const GPIO = require('./gpio/index');


!config.logging && logUtil.disable();

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

registerLegacyGPIOMethods(app);
registerPollutionMethods(app);
GPIO.registerGPIOApi(app);

app.use(express.static(config.webAppDir));

app.listen(config.serverPort, function () {
    logUtil.log('[uranium] started listening at port', config.serverPort);
});