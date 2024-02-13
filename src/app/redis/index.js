const { createClient } = require('redis');
const { logError } = require('sc_logger');

class RedisServer {
    constructor() {
        this.instance = null;
    }

    async start(connectionURL) {
        this.instance = createClient({ url: connectionURL });
        await this.instance.connect();
        this.instance.on('error', err => logError('Error creating redis instance: {}', err));
    }

    async get(searchKey) {
        const result = await this.instance.get(searchKey);
        return JSON.parse(result)
    }

    async set(key, value) {
        return await this.instance.set(key, JSON.stringify(value), {
            EX: 30,
            NX: true
        });
    }
}
module.exports = new RedisServer();
