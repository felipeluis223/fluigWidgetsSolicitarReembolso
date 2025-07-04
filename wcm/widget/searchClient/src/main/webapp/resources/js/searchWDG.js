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

                // Chama a função para montar a tabela
                that.renderTable(limitedData);

            } else {
                console.error('Erro ao buscar dataset:', result.statusText);
            }
        });
    },

    // Função que gera HTML da tabela
    renderTable: function (data) {
        console.log("Chamou renderTable:", data); // Debug

        if (!data || data.length === 0) {
            $("#target").html("<p>Nenhum dado encontrado.</p>");
            return;
        }

        // Monta tabela compacta sem scroll
        var table = '<table class="table table-sm table-striped table-bordered" ' +
                    'style="font-size: 9px; line-height: 1; border-collapse: collapse; width: 100%;">';

        // Cabeçalho
        table += '<thead><tr>';
        var keys = Object.keys(data[0]);
        for (var i = 0; i < keys.length; i++) {
            table += '<th style="padding: 2px 4px; border: 1px solid #ddd;">' + keys[i] + '</th>';
        }
        table += '</tr></thead>';

        // Corpo
        table += '<tbody>';
        for (var j = 0; j < data.length; j++) {
            table += '<tr>';
            for (var k = 0; k < keys.length; k++) {
                table += '<td style="padding: 2px 4px; border: 1px solid #ddd;" class="fs-text-xs">' + data[j][keys[k]] + '</td>';
            }
            table += '</tr>';
        }
        table += '</tbody></table>';

        // Aplica no div alvo
        $("#target").html(table);
    }





});
