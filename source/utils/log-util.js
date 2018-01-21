var enabled = true;

function defaultLogger() {
    return console.log.apply(this, arguments);
}

function log() {
    enabled && defaultLogger.apply(this, arguments);
    return true;
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
