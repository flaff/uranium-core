"use strict";
const express = require('express');

const registerLegacyGPIOMethods = require('./gpio/legacy-gpio.register.js');
const GPIO = require('./gpio/index');

const app = express(),
    APP_PORT = 80;

registerLegacyGPIOMethods(app);

GPIO.registerGPIOApi(app);

app.use(express.static('public'));

app.listen(APP_PORT, function () {
    console.log('[uranium] started listening at port', APP_PORT);
});