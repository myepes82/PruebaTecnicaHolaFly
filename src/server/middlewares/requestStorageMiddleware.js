
function requestStorageMiddleware(req, _, next) {
    const { method, headers, originalUrl, connection } = req

    const ip = (headers['x-forwarded-for'] || connection.remoteAddress || '').split(',')[0].trim()

    const headersAsString = JSON.stringify(headers)
    
    next()
}

module.exports = requestStorageMiddleware