class FluigUtils {

    static async restCall(obj) {

        let parms;

        if (obj.special) {
            parms = {
                method: obj.method,
                body: obj.json,
                processData: false
            }
        } else if (obj.json) {
            parms = {
                method: obj.method,
                body: JSON.stringify(obj.json),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        } else {
            parms = {
                method: obj.method
            }
        }

        return fetch(
                obj.url,
                parms
            )
            .then(async response => {
                return ({
                    response: await response.json(),
                    status: response.status,
                    statusText: response.statusText
                })
            })
            .then(result => result)
            .catch(err => err);

    }    

      static initLoading(title, message, fn, miau) {

        //MIAU = Método Interno para Ajuste Unificado
        if (miau) {
            console.log('ENTRAMOS NO MIAU - Método Interno para Ajuste Unificado');
            // return Swal.fire({
            //     title: title,
            //     html: `<span id="swal2-custom-loading"></span>${message}`,
            //     allowEscapeKey: false,
            //     allowOutsideClick: false,
            //     didOpen: () => {
            //         Swal.showLoading()
            //         fn()
            //             .then(() => $("#swal2-custom-loading").parents().eq(2).remove())
            //     }
            // });

        } else {
            console.log('CAIMOS NO ELSE DO MIAU - Método Interno para Ajuste Unificado');
            // Swal.fire({
            //     title: title,
            //     html: message,
            //     allowEscapeKey: false,
            //     allowOutsideClick: false,
            //     didOpen: () => {
            //         Swal.showLoading()
            //         fn()
            //             .then(Swal.close)
            //     }
            // });
        }
    }

}

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