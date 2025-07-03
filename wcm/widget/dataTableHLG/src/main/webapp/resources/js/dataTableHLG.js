var PainelDatatable = SuperWidget.extend({
    // Variáveis da widget
    variavelNumerica: null,
    variavelCaracter: null,

    // Método iniciado quando a widget é carregada
    init: function() {
        // Inicialização se necessário
    },

    // BIND de eventos
    bindings: {
        local: {
            'send-data': ['click_sendData'],
            'print-data': ['click_printData']
        },
        global: {}
    },

    // Apenas imprime no console
    printData: function() {
        console.log("CLICKADO NA FUNÇÃO DE IMPRIMIR...");
        window.print();
    },

    // Apenas imprime no console
    sendData: function() {
        console.log("CLICKADO NA FUNÇÃO DE ENVIAR...");
        var name = $("#nomeSolicitante").val();
        console.log('NOME: ' + name);
    }
});
