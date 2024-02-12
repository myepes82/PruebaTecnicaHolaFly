const { logInfo, logDebug } = require("sc_logger");
const db = require("../../../app/db");
const Planet = require("../../../domain/Planet/planet")

class SwPlanetDbAdapter {
    model 

    constructor() {
        this.model = db.swPlanet
    }


    async getPlanetById(id) {
        logInfo("Looking for SwPlanet identified by Id: {}", id)
        const result  = await this.model.findOne({
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
    }

    async createPlanet(planet) {
        const { id, name, gravity } = planet
        logInfo("Saving SwPlanet  record: {}", planet.toString())
        await this.model.create({
            id,
            name,
            gravity
        })
        logDebug("SwPlanet record saved.")
        return planet
    }
}


module.exports = SwPlanetDbAdapter