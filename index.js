"use strict";

var registerLegacyGPIOMethods = require('./gpio/legacy-gpio.js');

var express = require('express');

const app = express(),
    APP_PORT = 80;

registerLegacyGPIOMethods(app);

app.use(express.static('public'));

app.listen(APP_PORT, function () {
    console.log('[uranium] started listening at port', APP_PORT);
});