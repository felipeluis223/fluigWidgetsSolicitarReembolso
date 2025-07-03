var Search = SuperWidget.extend({
    myTable: null,
    dataFromServer: [],

    load: function(widgetInstance) {
        // Aqui roda no servidor - pode usar DatasetFactory
        var filial = null;
        // Se quiser pegar filtro do widgetInstance ou params, use aqui

        var constraints = [];
        if (filial) {
            constraints.push(DatasetFactory.createConstraint("A1_FILIAL", filial, filial, ConstraintType.MUST));
        }

        var dataset = DatasetFactory.getDataset("dsGetCliente", null, constraints, null);
        var data = [];

        if (dataset && dataset.values.length > 0) {
            for (var i = 0; i < dataset.values.length; i++) {
                var row = dataset.values[i];
                data.push({
                    filial: row["A1_FILIAL"],
                    codigo: row["A1_COD"],
                    loja: row["A1_LOJA"],
                    nome: row["A1_NOME"],
                    nreduz: row["A1_NREDUZ"],
                    endereco: row["A1_END"],
                    bairro: row["A1_BAIRRO"],
                    municipio: row["A1_MUN"],
                    email: row["A1_EMAIL"],
                    cnpj: row["A1_CGC"],
                    inscricao: row["A1_INSCR"]
                });
            }
        }
        console.log("DATASET: ");
        console.log(dataset);
        this.dataFromServer = data; // guarda os dados para usar no init
    },

    init: function() {
        // Roda no cliente após carregar
        this.renderTable(this.dataFromServer);
    },

    bindings: {
        local: {
            'btnLoad': ['click_loadTable'] // botão no html com data-bind="btnLoad"
        }
    },

    loadTable_click: function() {
        // Se quiser recarregar a tabela com filtro novo, pode fazer AJAX ou reload da página
        this.renderTable(this.dataFromServer);
    },

    renderTable: function(data) {
        if (this.myTable !== null) {
            this.myTable.destroy();
        }

        this.myTable = FLUIGC.datatable('#target', {
            dataRequest: data,
            renderContent: [
                'filial',
                'codigo',
                'loja',
                'nome',
                'nreduz',
                'endereco',
                'bairro',
                'municipio',
                'email',
                'cnpj',
                'inscricao'
            ],
            header: [
                { title: 'Filial' },
                { title: 'Código' },
                { title: 'Loja' },
                { title: 'Nome' },
                { title: 'Nome Reduzido' },
                { title: 'Endereço' },
                { title: 'Bairro' },
                { title: 'Município' },
                { title: 'E-mail' },
                { title: 'CNPJ/CPF' },
                { title: 'Inscrição Estadual' }
            ],
            search: { enabled: false },
            pagination: { enabled: false }
        }, function(err) {
            if (err) {
                FLUIGC.toast({ title: 'Erro', message: err, type: 'danger' });
            } else {
                console.log("DATA: ");
                console.log(data);
                console.log('Tabela carregada com Dataset!');
            }
        });
    }
});
