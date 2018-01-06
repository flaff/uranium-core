function safeParse(data) {
    return data && data.constructor && data.constructor === Number ? String(data) : data;
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