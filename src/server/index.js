const express = require('express');
const applyEndpoints = require('./endpoints');
const applyMiddlewares = require('./middlewares');
const { createClient } = require('redis');
const { logError } = require('sc_logger');

const createExpressServer = async app => {
	const server = express();

	const redisURL = process.env.REDIS_URL || 'redis://localhost:6379';

	await app.redisServer.start(redisURL)
	await app.db.initDB();

	applyMiddlewares(server, app);
	applyEndpoints(server, app);

    

	server.get('/', async (req, res) => {
		if(process.env.NODE_ENV === 'develop'){
				res.send('Test Enviroment');
		} else {
		    res.sendStatus(200);
		}
    });

	return server;
};

module.exports = createExpressServer;