const { logWarn, logInfo, logDebug } = require("sc_logger");
const db = require("../../../app/db");
const CommonPeople = require("../../../domain/People/commonPeople");

class SwPeopleDbAdapter {
    model;
    constructor() {
        this.model = db.swPeople;
    }

    async createSwPeople(people) {
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
    async getSwPeopleById(id) {
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
    }
}

module.exports = SwPeopleDbAdapter;
