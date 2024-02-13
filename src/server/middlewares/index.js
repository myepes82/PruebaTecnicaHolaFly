const errorHandlerMiddleware = require('./errorHandlerMiddleware');
const requestStorageMiddleware = require('./requestStorageMiddleware');
const redisRequestMiddleware = require('./redisRequestMiddleware');
const logRequestMiddleware = require('./logRequestMiddleware');
const loggingMiddleware = require('./loggingMiddleware');

const applyMiddlewares = (server, app) => {
    server.use(logRequestMiddleware);
    server.use(requestStorageMiddleware)
    server.use(errorHandlerMiddleware)
    server.use((req, res, next) => loggingMiddleware(req, res, next, app))
    server.use((req, res, next) => redisRequestMiddleware(req, res, next, app))
};

module.exports = applyMiddlewares;