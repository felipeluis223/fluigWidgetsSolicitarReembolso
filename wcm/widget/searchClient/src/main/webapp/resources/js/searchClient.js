var Search = SuperWidget.extend({
    myTable: null,

    init: function () {
        // Aqui você pode inicializar a tabela vazia
        this.loadTable([]);
    },

    bindings: {
        local: {
            'btnLoad': ['click_loadTable']
        }
    },

    loadTable: function () {
        var data = [
            { id: '001', name: 'São Paulo', uf: 'SP' },
            { id: '002', name: 'Campinas', uf: 'SP' },
            { id: '003', name: 'Santos', uf: 'SP' }
        ];
        // Destroi e recria a tabela
        if (this.myTable !== null) {
            this.myTable.destroy();
        }

        this.myTable = FLUIGC.datatable('#target', {
            dataRequest: data,
            renderContent: ['id', 'name', 'uf'],
            header: [
                { title: 'Código' },
                { title: 'Nome' },
                { title: 'UF' }
            ]
        }, function (err, data) {
            if (err) {
                FLUIGC.toast({ title: 'Erro', message: err, type: 'danger' });
            } else {
                console.log('Tabela carregada!');
            }
        });
    }
});
