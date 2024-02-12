const httpResponseTypeConstants = require("../constants/httpResponseTypeConstants");
const HttpException = require("./httpException");

class ResourceNotFoundException extends HttpException {
    constructor(description) {
        const { type, httpStatusCode } = httpResponseTypeConstants.RESOURCE_NOT_FOUND
        super(httpStatusCode, type, description)
    }
}

module.exports = ResourceNotFoundException