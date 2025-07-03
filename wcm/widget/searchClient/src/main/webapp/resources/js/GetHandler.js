class GetHandler {
    constructor(){
        this.userCode;
        this.eventFolder;
        this.uploadFiles = [];
        this.processList;
        this.userProcess;
        this.escalas = []
        this.userList = [];
        this.userGroup = [];
    }

    async listProcess(){
        try{
            let params = [];
            console.log('chamada PARAMS...')
            if ( $('#filialInput').val() && $('#filialInput').val() != undefined && $('#filialInput').val() != 'all' ) {
                params.push(
                    'codFilial',
                    $('#filialInput').val()
                )
            }
            params = params.toString();

            const data = await FluigUtils.restCall({
                url: `/api/public/ecm/dataset/search?datasetId=dsGetCliente&filterFields=${params}&`,
                method: "get"
            });
            console.log('DATA API: ' + data);

            if (data.status == 200 && data.response.content) {
                if (data.response.content.length > 0) {
                    console.log("CHECK SUCCESS...");
                    this.processList = data.response.content;
                    return {
                        error: false,
                        message: data.response.content
                    }
                } else {
                    this.processList = 0;
                    console.log("CHECK FAIL 1...");
                    return {
                        error: false,
                        message: null
                    }
                }
  
            } else {
                console.log("CHECK FAIL 2...");
                this.processList = null;
                return {
                    error: true,
                    message: data
                }
            }



        }catch(error){
            console.log("CHECK FAIL 3...");
            this.processList = null;
            return {
                error: true,
                message: error
            }
        }
    }
}