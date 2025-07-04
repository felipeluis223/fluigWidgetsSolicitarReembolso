// ========== FLUIG UTILS ==========
var FluigUtils = {
    restCall: function (obj, callback) {
        console.log("===========FLUIG UTILS - RESTCALL===========");
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

        console.log("Objeto: ", obj);
        console.log("========================");

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

    renderTable: function(selector, config) {
        FLUIGC.datatable(selector, {
            dataRequest: config.rows,
            columns: config.columns.map(function(col) {
                return {
                    data: col,
                    title: col
                };
            }),
            scroll: {
                target: selector,
                enabled: true
            },
            search: {
                enabled: true
            }
        });
    }
};
