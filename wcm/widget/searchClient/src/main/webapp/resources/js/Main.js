class Main {
    contructor(){
        this.dataHandler = new GetHandler();
    }

    async startEngines(){
        $('body').css('overflow', 'hidden');
        try{
            FluigUtils.initLoading("Processando", "Buscando...", async () => {
                const processList = await this.dataHandler.listProcess();
                console.log('CHECKLIST FLUIGUTILS');
                console.log(processList);
                console.log("==================")
    
                if (processList.error && !processList.message) {
    
                    $('body').css('overflow', 'hidden');
    
                    // FluigUtils.toast({
                    //     message: 'Ocorreu um erro ao listar: ' + processList.message,
                    //     type: 'error',
                    // });
    
                    $('body').css('overflow', 'auto');
    
                } else {
                    // this.renderView();
                    console.log('renderView')
                    /*this.executaReport();*/
                }


            });
        }
        catch (error) {
            console.log(error);
        }
        $('body').css('overflow', 'auto');
    }
}