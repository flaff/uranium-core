const DEFAULT_INTERVAL = 400;

function beepTimes(device, times, interval) {
    if (!interval) {
        interval = DEFAULT_INTERVAL;
    }

    if (times) {
        device.setBuzzer(true);
        setTimeout(function () {
            beepTimes(device, times - 1, interval);
        }, interval);
    }
}

module.exports = {
    beepTimes: beepTimes
};
