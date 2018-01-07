const moment = require('moment');

function stripDate(moment) {
    return moment.year(1970).date(1).millisecond(0);
}

function getCurrentTime() {
    return stripDate(moment.utc());
}

function getTimeFromString(string) {
    return stripDate(moment.utc(string, 'HH:mm'));
}

module.exports = {
    stripDate: stripDate,
    getCurrentTime: getCurrentTime,
    getTimeFromString: getTimeFromString
};