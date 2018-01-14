const
    moment = require('moment'),
    KRAKOW_ID = 415,
    COMPOUNDS = ['st', 'so2', 'no2', 'co', 'pm10', 'pm25', 'o3', 'c6h6'],
    INDEX_RESPONSE_DATE = 'YYYY-MM-DD HH:mm:ss';

function indexResponseToPollutionFragment (indexResponse) {
    const response = {},
        data = indexResponse.data;

    response.id = data.id || null;
    response.compounds = [];

    COMPOUNDS.forEach(function (compound) {

        if (data[compound + 'CalcDate']) {
            response.compounds.push({
                name: compound,
                indexLevel: data[compound + 'IndexLevel'].id,
                indexLevelName: data[compound + 'IndexLevel'].indexLevelName,
                dateString: data[compound + 'CalcDate'],
                date: +moment(data[compound + 'CalcDate'], INDEX_RESPONSE_DATE)
            });
        }
    });

    var indexLevelSum = 0;
    for (var i = 0; i < response.compounds.length; i++) {
        indexLevelSum += response.compounds[i].indexLevel;
    }

    response.indexLevel = 1 + indexLevelSum / response.compounds.length;
    response.indexLevel = Math.floor(10 * response.indexLevel) / 10;

    return response;
}

function parseStationsListResponse(stationsList) {
    const
        array = stationsList.filter(function (station) {
            return station.city && station.city.id === KRAKOW_ID;
        }),
        map = {};

    array.forEach(function (station) {
        map[station.id] = station;
    });

    return {
        asArray: array,
        asMap: map
    }
}

module.exports = {
    indexResponseToPollutionFragment: indexResponseToPollutionFragment,
    parseStationsListResponse: parseStationsListResponse
};
