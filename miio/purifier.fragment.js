function create(device) {
    return device ? {
        temperature: device.temperature,
        aqi: device.aqi,
        humidity: device.humidity,
        mode: device.mode,
        power: device.power
    } : null;
}

module.exports = {
    create: create
};
