// ========== SUPERWIDGET ==========
var Search = SuperWidget.extend({
    userTable: null,
    main: null,

    init: function () {
        this.main = new Main();
        var that = this;

        $(document).ready(function () {
            $("#btnBuscarDados").click(function () {
                that.executeReport();
            });

            $("#btnPrint").click(function() {
                printTable();
            });
        });
    },

    executeReport: function () {
        var that = this;

        FluigUtils.restCall({
            method: 'GET',
            url: '/api/public/ecm/dataset/search?datasetId=dsGetCliente'
        }, function (result) {
            if (result && result.status === 200) {
                var records = result.response.content || result.response || [];
                var mydata = [];
                console.log(records);
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
                // var limitedData = mydata.slice(0, 10);
                var limitedData = mydata;

                console.log('WDG_SYNCROS - Dados limitados:', limitedData);

                // Chama a função para montar a tabela
                renderTable(limitedData);

            } else {
                console.error('Erro ao buscar dataset:', result.statusText);
            }
        });
    }
});
