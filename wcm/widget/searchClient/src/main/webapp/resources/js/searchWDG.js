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

                // Aplica limite mockado de 10 registros
                var limitedData = mydata.slice(0, 10);

                console.log('WDG_SYNCROS - Dados limitados:', limitedData);
            } else {
                console.error('Erro ao buscar dataset:', result.statusText);
            }
        });
    }
});
