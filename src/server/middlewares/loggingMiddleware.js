const LoggingEntity = require("../../domain/Logs/logEntity")

async function loggingMiddleware(req, _, next, app) {
    try {
        const { headers, originalUrl, connection } = req

        const ip = (headers['x-forwarded-for'] || connection.remoteAddress || '').split(',')[0].trim()
        await app.services.swapiService.saveLog(new LoggingEntity(null, originalUrl, JSON.stringify(headers), ip))
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = loggingMiddleware