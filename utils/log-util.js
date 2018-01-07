var enabled = true;

function defaultLogger() {
    return console.log.apply(this, arguments);
}

function log() {
    return enabled && defaultLogger.apply(this, arguments);
}

function enable() {
    enabled = true;
}

function disable() {
    enabled = false;
}

module.exports = {
    log: log,
    enable: enable,
    disable: disable
};
