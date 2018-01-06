function proxyRequest(proxyResponse, modifier) {
    return function (apiResponse) {
        modifier && modifier(apiResponse, proxyResponse);
        proxyResponse.send(apiResponse.data);
    }
}

function proxyRequestFailHandler(proxyResponse, modifier) {
    return function (apiResponse) {
        modifier && modifier(apiResponse, proxyResponse);
        proxyResponse.send(JSON.stringify(apiResponse));
    }
}

module.exports = {
    proxyRequest: proxyRequest,
    proxyRequestFailHandler: proxyRequestFailHandler
};