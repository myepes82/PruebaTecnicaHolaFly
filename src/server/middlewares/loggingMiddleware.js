const { logInfo } = require("sc_logger");

function loggingMiddleware(req, _, next) {

    const { method, headers, originalUrl, connection } = req

    const ip = (headers['x-forwarded-for'] || connection.remoteAddress || '').split(',')[0].trim()

    logInfo("[{}] - Call to {} from {}", method, originalUrl, ip)
    next()
}
module.exports = loggingMiddleware;