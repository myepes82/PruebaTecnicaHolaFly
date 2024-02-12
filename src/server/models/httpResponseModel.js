class HttpResponseModel {
    success
    data
    constructor(success, data) {
        this.success = success
        this.data = data
    }
}


module.exports = HttpResponseModel