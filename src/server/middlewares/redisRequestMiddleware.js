const { logWarn, logDebug } = require("sc_logger")

async function redisRequestMiddleware(req, res, next, app) {
    const redisKey = req.path;
    const excludedEndpoints = [
        "/hfswapi/getLogs",
        "/hfswapi/getWeightOnPlanetRandom"
    ]
    if(excludedEndpoints.includes(redisKey)) {
        return next()
    }
    try {
        const chunks = [];
        const originalWrite = res.write;
        const originalEnd = res.end;

        res.write = function (chunk) {
            chunks.push(Buffer.from(chunk));
            originalWrite.apply(res, arguments);
        };

        res.end = function (chunk) {
            if (chunk) {
                chunks.push(Buffer.from(chunk));
            }

            const responseBody = Buffer.concat(chunks).toString('utf8');
            res.body = JSON.parse(responseBody);

            originalEnd.apply(res, arguments);
        };

        const redisCachedResult = await app.redisServer.get(redisKey);

        if (redisCachedResult) {
            logDebug('Cached result found for key {}: {}', redisKey, JSON.stringify(redisCachedResult));
            res.status(200).json(redisCachedResult);
        } else {
            res.on('finish', async () => {
                logWarn('No cached records found for key: {} - Caching response.', redisKey);
                await app.redisServer.set(redisKey, res.body);
                logDebug('Info cached.')
            });

            next();
        }
    } catch (error) {
        next(error);
    }
}

module.exports = redisRequestMiddleware