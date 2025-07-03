class EventHandler {

    constructor(main) {
        this.main = main;
        this.handleClickItens();
    }

    handleClickItens() {
        console.log('chamada');
        $("#btnBuscarDados").click(() => this.main.startEngines());
    }
    
}