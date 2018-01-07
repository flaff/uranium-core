"use strict";
const express = require('express');
const config = require('./config.js');
const logUtil = require('./utils/log-util.js');

const registerLegacyGPIOMethods = require('./gpio/legacy-gpio.register.js');
const GPIO = require('./gpio/index');

const app = express();

!config.logging && logUtil.disable();

registerLegacyGPIOMethods(app);
GPIO.registerGPIOApi(app);

app.use(express.static(config.webAppDir));

app.listen(config.serverPort, function () {
    logUtil.log('[uranium] started listening at port', config.serverPort);
});