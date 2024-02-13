const SwRestAdapter = require("../../adapters/out/http/swRestAdapter")
const SwPeopleDbAdapter = require("../../adapters/out/db/swPeopleDbAdapter");
const SwPlanetDbAdapter = require("../../adapters/out/db/swPlanetDbAdapter");
const SwLoggingDbAdapter = require("../../adapters/out/db/swLoggingDbAdapter");
const getRandomNumberUtil = require("../../common/utils/randomNumberUtil");
const InternalServerException = require("../../common/exceptions/internalServerException");

const swRestAdapter = new SwRestAdapter()
const swPeopleDbAdapter =  new SwPeopleDbAdapter()
const swPlanetDbAdapter =  new SwPlanetDbAdapter()
const swLoggingDbAdapter = new SwLoggingDbAdapter()


async function getPeopleById(id) {
    try {
        const dbPeople = await swPeopleDbAdapter.getPeopleById(id);
        const people = dbPeople || await swRestAdapter.getPeopleById(id)

        const dbPlanet = await swPlanetDbAdapter.getPlanetById(people.homeWorldId)
        const planet = dbPlanet || await swRestAdapter.getPlanetById(people.homeWorldId)

        if (!dbPeople) {
            people.setHomeWorldName(planet.getName())
            await swPeopleDbAdapter.createPeople(people)
        }
        if (!dbPlanet) {
            await swPlanetDbAdapter.createPlanet(planet)
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
        const dbPlanet = await swPlanetDbAdapter.getPlanetById(id)
        const planet = dbPlanet || await swRestAdapter.getPlanetById(id)
        if (!dbPlanet) {
            await swPlanetDbAdapter.createPlanet(planet)
        }
        return planet
    } catch (error) {
        throw error
    }
}

async function getWeightOnPlanetRandom() {
    try {
        const dbPeople = await swPeopleDbAdapter.getRandomPeople()
        const people = dbPeople || await swRestAdapter.getPeopleById(getRandomNumberUtil(10))

        const dbPlanet = await swPlanetDbAdapter.getRandomPlanet()
        const planet = dbPlanet || await swRestAdapter.getPlanetById(getRandomNumberUtil(10))

        if (!dbPlanet) {
            await swPlanetDbAdapter.createPlanet(planet)
        } 

        if(people.homeWorldId === planet.id) {
            throw new InternalServerException("Could not process")
        }
        const weight = people.mass * planet.gravity

        return { "people": people.name, "planet": planet.name, weight }
    } catch (error) {
        throw error
    }
}
async function getLogs() {
    try {
        return await swLoggingDbAdapter.getLogs()
    } catch (error) {
        throw error
    }
}

async function saveLog(logObject) {
    try {
        return await swLoggingDbAdapter.saveLog(logObject)
    } catch (error) {
        throw error
    }
}

module.exports = {
    getPeopleById,
    getPlanetById,
    getWeightOnPlanetRandom,
    getLogs,
    saveLog
}