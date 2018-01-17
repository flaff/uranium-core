"use strict";
const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config.js');
const logUtil = require('./utils/log-util.js');

const LegacyGPIO = require('./gpio/legacy-gpio.register');
const Pollution = require('./pollution/pollution.register');
const GPIO = require('./gpio');
const Miio = require('./miio');


!config.LOGGER_ENABLED && logUtil.disable();

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

LegacyGPIO.register(app);
GPIO.register(app);
Pollution.register(app);
Miio.register(app);

app.use(express.static(config.WEB_APP_DIRECTORY));

app.listen(config.SERVER_PORT, function () {
    logUtil.log('[uranium] started listening at port', config.SERVER_PORT);
});