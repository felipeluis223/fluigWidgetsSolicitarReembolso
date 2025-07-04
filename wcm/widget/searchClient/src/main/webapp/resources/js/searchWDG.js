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

            $("#btnPrint").click(function () {
                printTable();
            });
        });
    },

executeReport: function () {
    var dataInput = {
        filial: $("#filialInput").val().trim(),
        codigo: $("#codigoInput").val().trim(),
        loja: $("#lojaInput").val().trim(),
        nome: $("#nomeInput").val().trim(),
        nomeReduzido: $("#nreduzInput").val().trim(),
        endereco: $("#enderecoInput").val().trim(),
        bairro: $("#bairroInput").val().trim(),
        municipio: $("#municipioInput").val().trim(),
        email: $("#emailInput").val().trim(),
        cnpj: $("#cnpjInput").val().trim(),
        inscricaoEstadual: $("#inscrInput").val().trim()
    };

    var mapCampos = {
        filial: "A1_FILIAL",
        codigo: "A1_COD",
        loja: "A1_LOJA",
        nome: "A1_NOME",
        nomeReduzido: "A1_NREDUZ",
        endereco: "A1_END",
        bairro: "A1_BAIRRO",
        municipio: "A1_MUN",
        email: "A1_EMAIL",
        cnpj: "A1_CGC",
        inscricaoEstadual: "A1_INSCR"
    };

    var constraintsField = [];
    var constraintsInitialValue = [];
    var constraintsType = [];
    var constraintsLikeSearch = [];

    var likeFields = ["nome", "nomeReduzido", "endereco", "bairro", "municipio", "email"];

    for (var campo in dataInput) {
        if (dataInput[campo]) {
            constraintsField.push(mapCampos[campo]);
            var val = dataInput[campo];
            if (likeFields.includes(campo)) {
                val = "%" + val + "%";
                constraintsLikeSearch.push(true);
            } else {
                constraintsLikeSearch.push(false);
            }
            constraintsInitialValue.push(val);
            constraintsType.push("MUST");
        }
    }

    function encodeArrayParam(name, arr) {
        return arr.map(v => `${name}=${encodeURIComponent(v)}`).join("&");
    }

    var query = `datasetId=dsGetCliente&` +
        encodeArrayParam("constraintsField", constraintsField) + "&" +
        encodeArrayParam("constraintsInitialValue", constraintsInitialValue) + "&" +
        encodeArrayParam("constraintsType", constraintsType) + "&" +
        encodeArrayParam("constraintsLikeSearch", constraintsLikeSearch) +
        "&limit=300";

    var url = `/api/public/ecm/dataset/search?${query}`;

    console.log("URL gerada para filtro:", url); // <--- DEBUG

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

            console.log('WDG_SYNCROS - Dados encontrados:', mydata);
            renderTable(mydata);

        } else {
            console.error('Erro ao buscar dataset:', result.statusText);
        }
    });
}

});
