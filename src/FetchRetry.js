import 'whatwg-fetch';

function fetchRetry(url, options) {
    var retries = 0;
    var retryDelay = 500;

    if (options && options.retries) {
        retries = options.retries;
    }

    if (options && options.retryDelay) {
        retryDelay = options.retryDelay;
    }

    return new Promise(function (resolve, reject) {
        var wrappedFetch = function (n) {
            fetch(url, options)
                .then(function (response) {
                    let statusStr = response.status.toString();
                    if (statusStr.indexOf('2') === 0 || statusStr === '404') {
                        return response;
                    }
                    throw new Error(response.status + ": " + response.statusText);
                })
                .then(function (response) {
                    resolve(response);
                })
                .catch(function (error) {
                    if (n > 0) {
                        console.log("Retrying: " + url);
                        setTimeout(function () {
                            wrappedFetch(--n);
                        }, retryDelay);
                    } else {
                        console.log("Failed retries: " + url);
                        reject(error);
                    }
                });
        };
        wrappedFetch(retries);
    });
};


export default fetchRetry;