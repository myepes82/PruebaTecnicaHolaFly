class LoggingEntity {
    constructor(
        id,
        action,
        headers,
        ip
    ) {
        this.id = id
        this.action = action
        this.headers = headers
        this.ip = ip
    }

    withId(id) {
        return  {
            ...this,
            id
        }
    }
    toString() {
        return JSON.stringify(this)
    }
}

module.exports = LoggingEntity