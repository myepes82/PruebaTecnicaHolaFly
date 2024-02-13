const HttpRestAdapter = require("./httpRestAdapter")
const CommonPeople = require("../../../domain/People/commonPeopleEntity")
const { Planet } = require("../../../domain/Planet")

class SwRestAdapter {

    swapiBaseURL = "https://swapi.dev/api"

    httpRestAdapter

    constructor() {
        this.httpRestAdapter = new HttpRestAdapter({
            baseURL: this.swapiBaseURL,
            timeout: 10000,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    async getPeopleById(id) {
        const { name, mass, height, homeworld } = await this.httpRestAdapter.get(`/people/${id}`)

        const match = homeworld.match(/\/(\d+)\/$/)
        const homeWorldId = match ? match[1] : null
        return new CommonPeople(id, name, mass, height, homeWorldId,  null)
    }
    async getPlanetById(id) {
        const { name, gravity } = await this.httpRestAdapter.get(`/planets/${id}`)
        const parsedGravity = parseFloat(gravity.replace(/\D/g, ''))
        return new Planet(id, name, parsedGravity)
    }
}

module.exports = SwRestAdapter