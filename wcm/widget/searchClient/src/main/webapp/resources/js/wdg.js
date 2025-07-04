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

// ========== DATA HANDLER ==========
var DataHandler = function () {
    this.processList = [];
};

DataHandler.prototype.listProcess = function (callback) {
    var self = this;

    FluigUtils.restCall({
        method: 'GET',
        url: '/api/public/ecm/dataset/search?datasetId=dsGetCliente'
    }, function (result) {
        if (result && result.status === 200) {
            self.processList = result.response.content || result.response || [];
            callback({ error: false });
        } else {
            callback({ error: true, message: result.statusText });
        }
    });
};

// ========== MAIN ==========
var Main = function () {
    console.log("===========MAIN - DATAHANDLER===========");
    this.dataHandler = new DataHandler();
    console.log("======================");
};

// ========== SUPERWIDGET ==========
var Search = SuperWidget.extend({
    userTable: null,
    main: null,

    init: function () {
        console.log("===========WDG_SYNCROS - INIT===========");
        this.main = new Main();
        console.log(this.main);
        console.log("FIM DO PROCESSO");

        var that = this;

        $(document).ready(function () {
            $("#btnBuscarDados").click(function () {
                that.executeReport();
            });
        });
    },

    bindings: {
        local: {
            'execute': ['click_executeAction']
        },
        global: {}
    },

    executeAction: function (htmlElement, event) {
        // Evento customizado
    },

    executeReport: function () {
        console.log("===========WDG_SYNCROS - EXECUTEREPORT===========");

        var that = this;

        FluigUtils.restCall({
            method: 'GET',
            url: '/api/public/ecm/dataset/search?datasetId=dsGetCliente'
        }, function (result) {
            if (result && result.status === 200) {
                var records = result.response.content || result.response || [];
                var mydata = [];

                for (var index in records) {
                    var record = records[index];
                    var recordObject = {};

                    for (var columnName in record) {
                        if (record.hasOwnProperty(columnName)) {
                            recordObject[columnName] = record[columnName] || "";
                        }
                    }

                    mydata.push(recordObject);
                }

                // Limita a 10 registros
                var limitedData = mydata.slice(0, 10);

                console.log('WDG_SYNCROS - Dados limitados:', limitedData);
            } else {
                console.error('Erro ao buscar dataset:', result.statusText);
            }
        });
    }
});
