const { logError, logInfo, logDebug } = require("sc_logger");
const db = require("../../../app/db");
const LoggingEntity = require("../../../domain/Logs/logEntity");

class SwLoggingDbAdapter {
    model;

    constructor() {
        this.model = db.logging
    }

    async saveLog(loggingObject) {
        try {
            const { action, headers, ip } = loggingObject
            logInfo("Saving log record: {}", loggingObject.toString())
            const { id } = await this.model.create({
                action,
                header: headers,
                ip
            })
            logDebug("Log record saved with id: {}", id)
            return loggingObject.withId(id)
        } catch (error) {
            logError("Error trying to save logs on db: {}", error)
            throw error
        }
    }
    async getLogs() {
        try {
            logInfo("Looking logs on db")
            const result = await this.model.findAll()
            logDebug("Query result: {}" , JSON.stringify(result))
            return result.map(r => new LoggingEntity(r.id, r.action, r.header, r.ip))
        } catch (error) {
            logError("Error trying to get DB logs: {}", error)
            throw error
        }
    }
}

module.exports = SwLoggingDbAdapter