const errorHandlerMiddleware = require('./errorHandlerMiddleware');
const loggingMiddleware = require('./loggingMiddleware');
const requestStorageMiddleware = require('./requestStorageMiddleware');

const applyMiddlewares = (server, app) => {
    server.use(loggingMiddleware);
    server.use(requestStorageMiddleware)
    server.use(errorHandlerMiddleware)
	return server;
};

module.exports = applyMiddlewares;