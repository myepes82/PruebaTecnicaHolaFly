class HttpException extends Error {

    constructor(httpStatus, message, description) {
        super(message)
        this.httpStatus = httpStatus
        this.description = description
    }
}

module.exports = HttpException