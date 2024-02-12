const HttpResponseModel = require("../models/httpResponseModel")

function responseParserHandler(status, data, res) {
    const response = new HttpResponseModel(true, data)
    res.status(status).json(response)
}

module.exports = responseParserHandler