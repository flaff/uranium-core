function defaultLogger() {
    return console.log.apply(this, arguments);
}

function log() {
    return defaultLogger.apply(this, arguments);
}

module.exports = {
    log: log
};
