class Planet {

    constructor(id, name, gravity){
        this.id = id
        this.name = name
        this.gravity = gravity
    }

    getName() {
        return this.name;
    }

    getGravity() {
        return this.gravity;
    }

    toString() {
        return JSON.stringify(this)
    }
}

module.exports = Planet