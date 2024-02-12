const SwapiRestAdapter = require("../../adapters/out/http/swapiRestAdapter")
const SwPeopleDbAdapter = require("../../adapters/out/db/swPeopleDbAdapter");
const SwPlanetDbAdapter = require("../../adapters/out/db/swPlanetDbAdapter");
const { logWarn } = require("sc_logger");

const swapiRestAdapter = new SwapiRestAdapter()
const swPeopleAdapter = new SwPeopleDbAdapter()
const swPlanetAdapter = new SwPlanetDbAdapter()


async function getPeopleById(id) {
    try {
        const dbPeople = await swPeopleAdapter.getSwPeopleById(id);
        const people = dbPeople || await swapiRestAdapter.getPeopleById(id)

        const dbPlanet = await swPlanetAdapter.getPlanetById(people.id)
        const planet = dbPlanet || await swapiRestAdapter.getPlanetById(people.homeWorldId)

        if (!dbPeople) {
            people.setHomeWorldName(planet.getName())
            await swPeopleAdapter.createSwPeople(people)
        }
        if (!dbPlanet) {
            await swPlanetAdapter.createPlanet(planet)
        } else {
            people.setHomeWorldName(dbPlanet.getName())
        }

        return people

    } catch (error) {
        throw error
    }
}

async function getPlanetById(id) {
    try {
        const dbPlanet = await swPlanetAdapter.getPlanetById(id)
        const planet = dbPlanet || await swapiRestAdapter.getPlanetById(id)
        if (!dbPlanet) {
            await swPlanetAdapter.createPlanet(planet)
        }
        return planet
    } catch (error) {
        throw error
    }
}

async function getWeightOnPlanetRandom() {

    try {
        const user = await swPeopleAdapter.getSwPeopleById(1)
        console.log(user)
        await swapiRestAdapter.getPeopleById(1)
        return { "estado": "funcional" }
    } catch (error) {
        throw error
    }
}

module.exports = {
    getPeopleById,
    getPlanetById,
    getWeightOnPlanetRandom
}