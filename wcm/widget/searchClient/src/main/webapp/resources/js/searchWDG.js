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

            // Atualiza tabela ao mudar colunas visíveis
            $(".toggle-column").on("change", function () {
                if (window.ultimoResultadoDados) {
                    renderTable(window.ultimoResultadoDados);
                }
            });
        });
    },

    executeReport: function () {
        var cnpj = $("#cnpjInput").val().trim();
        var constraints = [];

        if (cnpj) {
            // Envia apenas a constraint que o dataset usa na API
            constraints.push(DatasetFactory.createConstraint("cCNPJ", cnpj, cnpj, ConstraintType.MUST));
        }

        console.log("CONSTRAINTS:", constraints);

        var datasetReturned = DatasetFactory.getDataset(
            "dsGetClienteFiltro",
            null,
            constraints,
            null
        );
        console.log('RETORNO: ');
        console.log(datasetReturned);

        if (datasetReturned && datasetReturned.values) {
            var mydata = datasetReturned.values.map(function (record) {
                var obj = {};
                for (var key in record) {
                    if (record.hasOwnProperty(key)) {
                        obj[key] = record[key] || "";
                    }
                }
                return obj;
            });

            window.ultimoResultadoDados = mydata;
            renderTable(mydata);
        } else {
            console.error("Nenhum dado retornado do Dataset.");
        }
    }
});
