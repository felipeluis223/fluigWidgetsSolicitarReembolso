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

            $("#btnPrint").click(function () {
                printTable();
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
        constraints.push(`constraintsField[${i}]=cCNPJ`);
        constraints.push(`constraintsInitialValue[${i}]=${encodeURIComponent(cnpj)}`);
        constraints.push(`constraintsType[${i}]=MUST`);
        constraints.push(`constraintsLikeSearch[${i}]=false`);
        i++;
    }

    if (nomeReduzido) {
        constraints.push(`constraintsField[${i}]=cNFANTASIA`);
        constraints.push(`constraintsInitialValue[${i}]=${encodeURIComponent('%' + nomeReduzido + '%')}`);
        constraints.push(`constraintsType[${i}]=MUST`);
        constraints.push(`constraintsLikeSearch[${i}]=true`);
        i++;
    }

    if (nome) {
        constraints.push(`constraintsField[${i}]=cRAZAO`);
        constraints.push(`constraintsInitialValue[${i}]=${encodeURIComponent('%' + nome + '%')}`);
        constraints.push(`constraintsType[${i}]=MUST`);
        constraints.push(`constraintsLikeSearch[${i}]=true`);
        i++;
    }

    // LIMIT deve ficar fora das constraints!
    var query = `datasetId=dsGetClienteFiltro&${constraints.join("&")}&limit=300`;
    var url = `/api/public/ecm/dataset/search?${query}`;

    console.log("URL com filtros CNPJ e Nome Reduzido: ", url);

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

            console.log('REQ WIDGET - Dados encontrados:', mydata);
            renderTable(mydata);

        } else {
            console.error('Erro ao buscar dataset:', result.statusText);
        }
    });
}

});
