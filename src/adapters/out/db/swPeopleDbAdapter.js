const { logInfo, logDebug, logError } = require("sc_logger");
const db = require("../../../app/db");
const CommonPeople = require("../../../domain/People/commonPeopleEntity");
const { Sequelize } = require("sequelize");

class SwPeopleDbAdapter {
    model;
    constructor() {
        this.model = db.swPeople;
    }

    async createPeople(people) {
        const { id, name, mass, height, homeWorldId, homeWorldName } = people;
        logInfo("Saving SwPeople record: {}", people.toString());
        await this.model.create({
            id,
            name,
            mass,
            height,
            homeworld_name: homeWorldName,
            homeworld_id: homeWorldId,
        });
        logDebug("SwPeople record saved.");
        return people;
    }
    async getPeopleById(id) {
        try {
            logInfo("Looking SwPeople identified by id: {}", id);
            const result = await this.model.findOne({
                where: {
                    id,
                },
            });

            logDebug("Query result: {}", result)
            if (!result) return null
            const { name, height, mass, homeworld_name, homeworld_id } = result
            return new CommonPeople(
                id,
                name,
                mass,
                height,
                homeworld_id,
                homeworld_name
            );
        } catch (error) {
            logError("Error trying to get SwPeople by id: {}", error)
            throw error
        }
    }

    async getRandomPeople() {
        try {
            logInfo("Getting random SwPeople record")
            const result = await this.model.findOne({
                order: Sequelize.literal("RANDOM()")
            })
            logDebug("Query result: {}", JSON.stringify(result))
            if(!result) return null
            const { id, name, height, mass, homeworld_name, homeworld_id } = result
            return new CommonPeople(
                id,
                name,
                mass,
                height,
                homeworld_id,
                homeworld_name
            );
        } catch (error) {
            logError("Error trying to get random SwPeople: {}", error)
            throw error
        }
    }
}

module.exports = SwPeopleDbAdapter;
