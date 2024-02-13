const { Axios } = require("axios")
const BadRequestException = require("../../../common/exceptions/badRequestException")
const ResourceNotFoundException = require("../../../common/exceptions/resourceNotFoundException")
const InternalServerException = require("../../../common/exceptions/internalServerException")
const { logDebug, logError, logInfo } = require("sc_logger")
class HttpRestAdapter {
    requestManager
    config

    constructor(config) {
        const { baseURL, timeout, headers } = config
        this.requestManager = new Axios({
            baseURL,
            timeout,
            headers
        })
        this.config = config
    }

    async get(path) {
        try {
            logInfo("Doing GET request to: {}", this.config.baseURL + path)
            const result = await this.requestManager.get(path)
            const data = await result.data
            logDebug("Get request result: {}", data)
            return JSON.parse(data)
        } catch (error) {
            const { response, request } = error

            logError("Error on HTTP Request: {}", error)
            if (response) {
                const { status, statusText } = response

                if (status === 400) {
                    throw new BadRequestException(statusText)
                } else if (status === 404) {
                    throw new ResourceNotFoundException(statusText)
                } else {
                    throw new InternalServerException(statusText)
                }
            } else if (request) {
                throw new InternalServerException("No server response.")
            }
            throw error
        }
    }

}

module.exports = HttpRestAdapter