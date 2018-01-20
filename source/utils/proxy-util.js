const safeParse = (data) => (typeof data === 'number') ? String(data) : data;

export const proxyRequest = (proxyResponse, modifier) => {
    return (apiResponse) => {
        modifier && modifier(apiResponse, proxyResponse);
        proxyResponse.send(safeParse(apiResponse.data));
    }
};

export const proxyRequestFailHandler = (proxyResponse, modifier) => {
    return (apiResponse) => {
        modifier && modifier(apiResponse, proxyResponse);
        proxyResponse.send(safeParse(apiResponse.data));
    }
};
