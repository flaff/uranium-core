const legacyGPIO = require('./legacy-gpio.proxy');
const logUtil = require('./../utils/log-util');
const momentUtil = require('./../utils/moment-util');

function GPIO (id, origin) {
    this.id = id;
    this.origin = origin;
    this.value = null;
    this.direction = null;
    this.forceValue = null;
    this.cycles = null;
    this.timeToNextCycle = null;
}

GPIO.prototype.updateLegacy = function (gpio) {
    this.value = !!+gpio.value;
    this.direction = gpio.function;
};

GPIO.prototype.setValue = function (value) {
    if (this.value !== value) {
        this.value = value;

        legacyGPIO
            .setGPIOValue(this.id, value ? 1 : 0)
            .catch(function () {/* fail silently */});
    }
};

GPIO.prototype.getValue = function () {
    return this.value;
};

GPIO.prototype.addCycle = function (from, to) {
    if (!this.cycles) {
        this.cycles = [];
    }
    this.cycles.push({id: this.cycles.length, from: from, to: to});
};

GPIO.prototype.removeCycleId = function (cycleId) {
    this.cycles && this.cycles[cycleId] && this.cycles.splice(cycleId, 1);
};

GPIO.prototype.forceValue = function (value) {
    this.forceValue = value;
};

GPIO.prototype.cycleCheck = function (moment) {
    var shouldBeEnabled = false,
        timeToNextCycle = null;

    if (this.forceValue !== null) {
        this.value !== this.forceValue && this.setValue(this.forceValue);
    }
    else if (this.cycles && this.cycles.length) {
        const midnight = momentUtil.getTimeFromString('01:00'); // todo

        for (var i = 0; i < this.cycles.length; i++) {
            const isWithinCycle = (moment >= this.cycles[i].from && moment < this.cycles[i].to);

            if (isWithinCycle) {
                logUtil.log('[gpio]', moment, this.id, 'is within cycle', this.cycles[i].from, this.cycles[i].to);
                timeToNextCycle = this.cycles[i].to - moment;
                shouldBeEnabled = true;
                break;
            }

            if (i < this.cycles.length - 1) {
                timeToNextCycle = this.cycles[i].from - moment;
            } else {
                timeToNextCycle = this.cycles[i].from - moment + ((moment < midnight) ? midnight : -midnight);
            }
        }

        if (shouldBeEnabled !== this.value) {
            logUtil.log('[gpio] changing', this.id, 'by cycle to', shouldBeEnabled);
            this.setValue(shouldBeEnabled);
        }
    } else {
        timeToNextCycle = null;
    }

    this.timeToNextCycle = timeToNextCycle;
};

module.exports = GPIO;