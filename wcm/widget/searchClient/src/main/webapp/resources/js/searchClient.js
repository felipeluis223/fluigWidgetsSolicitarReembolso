var Search = SuperWidget.extend({
    myTable: null,

    init: function () {
        // Aqui você pode inicializar a tabela vazia
        // this.loadTable([]);
        const main = new Main();
        new EventHandler(main)
    },

    bindings: {
        local: {
            'btnLoad': ['click_loadTable']
        }
    },

    loadTable: function () {
       var data = [
            {
                filial: "0001",
                codigo: "0012345",
                loja: "01",
                nome: "João da Silva",
                nreduz: "J. Silva",
                endereco: "Rua das Flores, 100",
                bairro: "Centro",
                municipio: "São Paulo",
                email: "joao@exemplo.com",
                cnpj: "12.345.678/0001-90",
                inscricao: "123456789"
            },
            {
                filial: "0002",
                codigo: "0098765",
                loja: "02",
                nome: "Maria Oliveira",
                nreduz: "M. Oliveira",
                endereco: "Av. Paulista, 1500",
                bairro: "Bela Vista",
                municipio: "Campinas",
                email: "maria@empresa.com",
                cnpj: "98.765.432/0001-10",
                inscricao: "987654321"
            },
            {
                filial: "0003",
                codigo: "0043210",
                loja: "03",
                nome: "Carlos Lima",
                nreduz: "C. Lima",
                endereco: "Rua A, 45",
                bairro: "Boa Vista",
                municipio: "Santos",
                email: "carlos@email.com",
                cnpj: "11.111.111/1111-11",
                inscricao: "1122334455"
            }
        ];

        // Destroi e recria a tabela
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
                { title: 'Filial' },              // A1_FILIAL
                { title: 'Código' },              // A1_COD
                { title: 'Loja' },                // A1_LOJA
                { title: 'Nome' },                // A1_NOME
                { title: 'Nome Reduzido' },       // A1_NREDUZ
                { title: 'Endereço' },            // A1_END
                { title: 'Bairro' },              // A1_BAIRRO
                { title: 'Município' },           // A1_MUN
                { title: 'E-mail' },              // A1_EMAIL
                { title: 'CNPJ/CPF' },            // A1_CGC
                { title: 'Inscrição Estadual' }   // A1_INSCR
            ],
            search: {
                enabled: false
            },
            

        }, function (err, data) {
            if (err) {
                FLUIGC.toast({ title: 'Erro', message: err, type: 'danger' });
            } else {
                console.log('Tabela carregada!');
            }
        });
    }
});
