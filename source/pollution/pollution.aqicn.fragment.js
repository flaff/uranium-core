const
    moment = require('moment'),
    API_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export const create = ({data}) => ({
    name: data.data.city.name,
    indexLevel: data.data.aqi,
    compounds: Object.keys(data.data.iaqi).map(c => ({
        name: c,
        indexLevel: data.data.iaqi[c].v
    })),
    date: +moment(data.data.time.s, API_TIME_FORMAT)
});
