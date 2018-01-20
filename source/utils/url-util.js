function setURLParams(url, params) {
    if (params) {
        Object.keys(params).forEach(function (paramName) {
            url = url.replace('{{' + paramName + '}}', params[paramName])
        });
    }
    return url;
}

module.exports = {
    setParams: setURLParams
};