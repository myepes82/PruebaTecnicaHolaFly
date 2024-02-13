const db = require('./db');
const services = require('./services')
const redisServer = require("./redis")

module.exports = {
    db,
    services,
    redisServer
}