const
    Provider = require('./pollution.ggios.provider'),
    Fragment = require('./pollution.ggios.fragment'),
    ONE_HOUR_MS = 3.6e6,
    CITY_ID = 401;


var StationCache = null,
    StationsCache = null;

function refreshCache(station) {
    return Provider.getStationIndexes(station)
        .then(function (response) {
            StationCache = Fragment.create(response);
        })
        .catch(function () {
            if (StationCache) {
                StationCache.error = true;
            } else {
                StationCache = {
                    error: true,
                    id: null,
                    indexLevel: null,
                    compounds: null
                };
            }
        });
}

function addStationName() {
    if (StationCache && StationsCache && StationsCache.asMap[StationCache.id]) {
        StationCache.name = StationsCache.asMap[StationCache.id].stationName;
    }
}


Provider.getAllStations()
    .then(function (response) {
        StationsCache = Fragment.parseStationsListResponse(response.data);
        refreshCache(CITY_ID).then(addStationName);
    });

setInterval(function () {
    refreshCache(CITY_ID).then(addStationName);
}, ONE_HOUR_MS);

function getStationInfo(station) {
    return StationCache;
}

module.exports = {
    getStationInfo: getStationInfo
};
