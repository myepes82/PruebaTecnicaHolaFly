const AbstractPeople = require("./abstractPeople");

class CommonPeople extends AbstractPeople {
    
    constructor(id, name, mass, height, homeWorldId, homeWorldName ){
        super(id)
        this.name = name 
        this.mass = mass
        this.height = height
        this.homeWorldId = homeWorldId
        this.homeWorldName = homeWorldName
    }


    setId(id){
        this.id = id
    }
    setHomeWorldName(name) {
        this.homeWorldName = name
    }

    toString() {
        return JSON.stringify(this)
    }
}


module.exports = CommonPeople