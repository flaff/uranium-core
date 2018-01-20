export const create = (device) => (device ? {
    temperature: device.temperature,
    aqi: device.aqi,
    humidity: device.humidity,
    mode: device.mode,
    power: device.power
} : null);

