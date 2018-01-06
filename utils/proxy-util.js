function safeParse(data) {
    return (typeof data === 'number') ? String(data) : data;
}

function proxyRequest(proxyResponse, modifier) {
    return function (apiResponse) {
        modifier && modifier(apiResponse, proxyResponse);
        proxyResponse.send(safeParse(apiResponse.data));
    }
}

function proxyRequestFailHandler(proxyResponse, modifier) {
    return function (apiResponse) {
        modifier && modifier(apiResponse, proxyResponse);
        proxyResponse.send(safeParse(apiResponse.data));
    }
}

module.exports = {
    proxyRequest: proxyRequest,
    proxyRequestFailHandler: proxyRequestFailHandler
};