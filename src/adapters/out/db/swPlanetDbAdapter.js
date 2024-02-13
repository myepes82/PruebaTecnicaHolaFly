const { logInfo, logDebug, logError } = require("sc_logger");
const db = require("../../../app/db");
const { Planet } = require("../../../domain/Planet");
const { Sequelize } = require("sequelize");

class SwPlanetDbAdapter {
    model

    constructor() {
        this.model = db.swPlanet
    }


    async getPlanetById(id) {
        try {
            logInfo("Looking for SwPlanet identified by Id: {}", id)
            const result = await this.model.findOne({
                where: {
                    id
                }
            })
            logDebug("Query result: {}", JSON.stringify(result))
            if (!result) return null
            const {
                name,
                gravity
            } = result
            return new Planet(id, name, gravity)
        } catch (error) {
            logError("Error get Planet records: {}", error)
            throw error
        }
    }

    async createPlanet(planet) {
        try {
            const { id, name, gravity } = planet
            logInfo("Saving SwPlanet  record: {}", planet.toString())
            await this.model.create({
                id,
                name,
                gravity
            })
            logDebug("SwPlanet record saved.")
            return planet
        } catch (error) {
            logError("Error trying to save Planet: {}", error)
            throw error
        }
    }

    async getRandomPlanet() {
        try {
            logInfo("Getting random SwPlanet record")
            const result = await this.model.findOne({
                order: Sequelize.literal("RANDOM()")
            })
            logDebug("Query result: {}", JSON.stringify(result))
            if(!result) return null
            const {
                id,
                name,
                gravity
            } = result
            return new Planet(id, name, gravity)
        } catch (error) {
            logError("Error trying to get random SwPlanet: {}", error)
            throw error
        }
    }
}


module.exports = SwPlanetDbAdapter