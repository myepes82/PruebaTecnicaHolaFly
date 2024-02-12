const { logError } = require("sc_logger");
const HttpException = require("../../common/exceptions/httpException");
const httpResponseTypeConstants = require("../../common/constants/httpResponseTypeConstants");

function errorHandlerMiddleware(err, req, res, _) {
    const isCustomError = err instanceof HttpException
    const unhandledException = httpResponseTypeConstants.INTERNAL_SERVER_ERROR

    const exceptionType = isCustomError ? err.message : unhandledException.type
    const httpStatus = isCustomError ? err.httpStatus : unhandledException.httpStatusCode
    const description = isCustomError ? err.description : err.message

    const { method, originalUrl } = req

    const errorResponse = new HttpErrorResponse(exceptionType, description)
    logError('[{}] - Call to {} with status {}', method, originalUrl, httpStatus)
    res.status(httpStatus).json(errorResponse)
}

module.exports = errorHandlerMiddleware