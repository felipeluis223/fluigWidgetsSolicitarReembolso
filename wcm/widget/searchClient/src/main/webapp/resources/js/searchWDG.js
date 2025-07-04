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
        if (!data || data.length === 0) {
            $("#target").html("<p>Nenhum dado encontrado.</p>");
            return;
        }

        var keys = Object.keys(data[0]);

        var table = '<table class="table table-sm table-striped table-bordered" ' +
                    'style="font-size: 9px; line-height: 1; border-collapse: collapse; width: 100%;">';

        table += '<thead><tr>';
        for (var i = 0; i < keys.length; i++) {
            table += '<th style="padding: 2px 4px; border: 1px solid #ddd; cursor: pointer;" class="fs-text-xs" data-col="' + i + '" data-order="desc">' + keys[i] + '</th>';
        }
        table += '</tr></thead>';

        table += '<tbody>';
        for (var j = 0; j < data.length; j++) {
            table += '<tr>';
            for (var k = 0; k < keys.length; k++) {
                table += '<td style="padding: 2px 4px; border: 1px solid #ddd;" class="fs-text-xs">' + data[j][keys[k]] + '</td>';
            }
            table += '</tr>';
        }
        table += '</tbody></table>';

        $("#target").html(table);

        // Evento para ordenar colunas ao clicar no cabeçalho
        $("#target th").on('click', function () {
            var tableEl = $(this).closest('table');
            var tbody = tableEl.find('tbody');
            var rows = tbody.find('tr').toArray();
            var colIndex = $(this).data('col');
            var order = $(this).data('order');
            var text;

            // Alterna ordem
            order = (order === 'desc') ? 'asc' : 'desc';
            $(this).data('order', order);

            // Atualiza indicador (seta)
            $("#target th").each(function() {
                $(this).html($(this).text().replace(' ▲','').replace(' ▼',''));
                $(this).data('order', 'desc');
            });
            $(this).html($(this).text() + (order === 'asc' ? ' ▲' : ' ▼'));
            $(this).data('order', order);

            rows.sort(function (a, b) {
                var A = $(a).find('td').eq(colIndex).text().toUpperCase();
                var B = $(b).find('td').eq(colIndex).text().toUpperCase();

                // Se for número, converte para float para comparar numericamente
                var numA = parseFloat(A.replace(/[^0-9.\-]+/g,""));
                var numB = parseFloat(B.replace(/[^0-9.\-]+/g,""));

                if (!isNaN(numA) && !isNaN(numB)) {
                    A = numA;
                    B = numB;
                }

                if (A < B) return order === 'asc' ? -1 : 1;
                if (A > B) return order === 'asc' ? 1 : -1;
                return 0;
            });

            $.each(rows, function(index, row) {
                tbody.append(row);
            });
        });
    }






});
