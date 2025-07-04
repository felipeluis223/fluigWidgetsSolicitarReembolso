// ========== FLUIG UTILS ==========
var FluigUtils = {
    restCall: function (obj, callback) {
        var parms;

        if (obj.special) {
            parms = {
                method: obj.method,
                body: obj.json,
                processData: false
            };
        } else if (obj.json) {
            parms = {
                method: obj.method,
                body: JSON.stringify(obj.json),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            };
        } else {
            parms = {
                method: obj.method
            };
        }

        // console.log("Objeto: ", obj);

        fetch(obj.url, parms)
            .then(function (response) {
                response.json().then(function (json) {
                    callback({
                        response: json,
                        status: response.status,
                        statusText: response.statusText
                    });
                });
            })
            .catch(function (err) {
                callback(err);
            });
    },
};
