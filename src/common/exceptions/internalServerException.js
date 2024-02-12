const httpResponseTypeConstants = require("../constants/httpResponseTypeConstants");
const HttpException = require("./httpException");

class InternalServerException extends HttpException{
    constructor(description) {
        const { type, httpStatusCode } = httpResponseTypeConstants.INTERNAL_SERVER_ERROR
        super(httpStatusCode, type, description)
    }
}

module.exports = InternalServerException