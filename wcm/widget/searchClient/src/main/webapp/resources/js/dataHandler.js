// ========== DATA HANDLER ==========
var DataHandler = function () {
    this.processList = [];
};

DataHandler.prototype.listProcess = function (callback) {
    var self = this;

    FluigUtils.restCall({
        method: 'GET',
        url: '/api/public/ecm/dataset/search?datasetId=dsGetCliente'
    }, function (result) {
        if (result && result.status === 200) {
            self.processList = result.response.content || result.response || [];
            callback({ error: false });
        } else {
            callback({ error: true, message: result.statusText });
        }
    });
};
