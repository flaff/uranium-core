function proxyRequest(proxyResponse, modifier) {
    return function (apiResponse) {
        modifier && modifier(apiResponse, proxyResponse);
        proxyResponse.send(apiResponse.data);
    }
}

module.exports = {
    proxyRequest: proxyRequest
};