import Config from '../config';

export const beepTimes = (device, times, interval = Config.PURIFIER_BEEP_INTERVAL) => {
    if (times) {
        device.setBuzzer(true);
        setTimeout(() => beepTimes(device, times - 1, interval), interval);
    }
};
