const httpResponseTypeConstants = require("../constants/httpResponseTypeConstants");
const HttpException = require("./httpException");

class BadRequestException extends HttpException {
    constructor(description){
        const { type, httpStatusCode } = httpResponseTypeConstants.BAD_REQUEST
        super(httpStatusCode, type)
        this.description = description
    }
}


module.exports = BadRequestException