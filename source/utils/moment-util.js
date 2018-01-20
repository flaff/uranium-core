import moment from 'moment';

export const stripDate = (moment) => moment.year(1970).date(1).millisecond(0);
export const getCurrentTime = () => stripDate(moment());
export const getTimeFromString =(string) => stripDate(moment(string, 'HH:mm'));
