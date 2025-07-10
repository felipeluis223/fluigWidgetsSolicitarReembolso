var Search = SuperWidget.extend({
    userTable: null,
    main: null,

    init: function () {
        this.main = new Main();
        var that = this;

        $(document).ready(function () {
            $("#lojaInput").mask("00");

            $("#btnBuscarDados").click(function () {
                that.executeReport();
            });

            // Funções de exportar os dados:
            $("#btnExportPDF").click(function () {
                exportPDF();
            });
            $("#btnExportCSV").click(function () {
                exportCSV();
            });
            $("#btnExportXLSX").click(function () {
                exportXLSX();
            });

            // Sempre que um toggle for alterado, renderiza a tabela com as colunas selecionadas
            $(".toggle-column").on("change", function () {
                if (window.ultimoResultadoDados) {
                    renderTable(window.ultimoResultadoDados);
                }
            });
        });
    },

    executeReport: function () {
        var cnpj = $("#cnpjInput").val().trim();
        var nome = $("#nomeInput").val().trim();
        var nomeReduzido = $("#nreduzInput").val().trim();

        var constraints = [];
        var i = 0;

        if (cnpj) {
            constraints.push(`constraintsField[${i}]=A1_CGC`);
            constraints.push(`constraintsInitialValue[${i}]=${encodeURIComponent(cnpj)}`);
            constraints.push(`constraintsType[${i}]=MUST`);
            constraints.push(`constraintsLikeSearch[${i}]=false`);
            i++;
        }

        if (nomeReduzido) {
            constraints.push(`constraintsField[${i}]=A1_NREDUZ`);
            constraints.push(`constraintsInitialValue[${i}]=${encodeURIComponent('%' + nomeReduzido + '%')}`);
            constraints.push(`constraintsType[${i}]=MUST`);
            constraints.push(`constraintsLikeSearch[${i}]=true`);
            i++;
        }

        if (nome) {
            constraints.push(`constraintsField[${i}]=A1_NOME`);
            constraints.push(`constraintsInitialValue[${i}]=${encodeURIComponent('%' + nome + '%')}`);
            constraints.push(`constraintsType[${i}]=MUST`);
            constraints.push(`constraintsLikeSearch[${i}]=true`);
            i++;
        }

        var query = `datasetId=dsGetClienteFiltro&${constraints.join("&")}&limit=300`;
        var url = `/api/public/ecm/dataset/search?${query}`;

        FluigUtils.restCall({
            method: 'GET',
            url: url
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

                window.ultimoResultadoDados = mydata; // salva para reaproveitar no toggle

                renderTable(mydata);

            } else {
                console.error('Erro ao buscar dataset:', result.statusText);
            }
        });
    }
});
