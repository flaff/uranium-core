/*
 * polish index:
 * 0-1 v.good;
 * 1-3 good;
 * 3-5 moderate;
 * 5-7 sufficient;
 * 7-10 bad;
 * 10+ v.bad
 *
 * AQI:
 * 0-50 good;
 * 51-100 moderate;
 * 101-150 unhealthy sg;
 * 151-200 unhealthy;
 * 201-300 v.unhealthy;
 * 300+ hazardous
 */

export const polishIndexLeveltoAQI = (i) => {
    i = Number(i);
    if (i <= 1) {
        return Math.round(i * 50);
    }
    if (i <= 3) {
        return Math.round(i * 100 / 3);
    }
    if (i <= 7) {
        return Math.round(i * 200 / 7);
    }
    return Math.round(i * 300 / 10);
};
