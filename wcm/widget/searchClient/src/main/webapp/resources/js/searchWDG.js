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

    // Filtra keys removendo 'A1_FILIAL'
    var keys = Object.keys(data[0]).filter(function(key) {
        return key !== "A1_FILIAL";
    });

    var table = '<table class="table table-sm table-striped table-bordered" ' +
                'style="font-size: 9px; line-height: 1; border-collapse: collapse; width: 100%;">';

    // Cabeçalho
    table += '<thead><tr>';
    for (var i = 0; i < keys.length; i++) {
        var columnTitle = keys[i];
        if(keys[i] == "A1_COD") {
            columnTitle = "Código";
        }
        else if(keys[i] == "A1_NREDUZ") {
            columnTitle = "Nome reduzido";
        }
        else if(keys[i] == "A1_BAIRRO") {
            columnTitle = "Bairro";
        }
        else if(keys[i] == "A1_END") {
            columnTitle = "Endereço";
        }
        else if(keys[i] == "A1_EMAIL") {
            columnTitle = "E-mail";
        }
        else if(keys[i] == "A1_LOJA") {
            columnTitle = "Loja";
        }
        else if(keys[i] == "A1_NOME") {
            columnTitle = "Nome";
        }
        else if(keys[i] == "A1_CGC") {
            columnTitle = "CNPJ/CPF";
        }
        else if(keys[i] == "A1_INSCR") {
            columnTitle = "Insc.Estadual";
        }
        else if(keys[i] == "A1_MUN") {
            columnTitle = "Município";
        }

        table += '<th style="padding: 2px 4px; border: 1px solid #ddd; cursor: pointer;" class="fs-text-xs" data-col="' + i + '" data-order="desc">' + columnTitle + '</th>';
    }
    table += '</tr></thead>';

    // Corpo da tabela
    table += '<tbody>';
    for (var j = 0; j < data.length; j++) {
        table += '<tr>';
        for (var k = 0; k < keys.length; k++) {
            table += '<td style="padding: 2px 4px; border: 1px solid #ddd;" class="fs-text-xs">' + (data[j][keys[k]] || '') + '</td>';
        }
        table += '</tr>';
    }
    table += '</tbody></table>';

    $("#target").html(table);

    // Ordenação ao clicar no cabeçalho
    $("#target th").on('click', function () {
        var tableEl = $(this).closest('table');
        var tbody = tableEl.find('tbody');
        var rows = tbody.find('tr').toArray();
        var colIndex = $(this).data('col');
        var order = $(this).data('order');

        order = (order === 'desc') ? 'asc' : 'desc';
        $(this).data('order', order);

        rows.sort(function (a, b) {
            var A = $(a).find('td').eq(colIndex).text().toUpperCase();
            var B = $(b).find('td').eq(colIndex).text().toUpperCase();

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
