class AbstractPeople {

    constructor(id) {
        if (this.constructor === AbstractPeople) {
            throw new Error('Abstract classes can\'t be instantiated.');
        }
        this.id = id;

    }

    init() {
        throw new Error('To be implemented');
    }

    getId() {
       return this.id;
    }

    getName() {
        return this.name;
    }

    getMass() {
        return this.mass;
    }

    getHeight() {
        return this.height;
    }

    getHomeworldName() {
        return this.homeworld_name;
    }

    getHomeworlId() {
        return this.homeworld_id;
    }

    getWeightOnPlanet(planetId) {
        throw new Error('To be implemented', planetId);
    }
}

exports.AbstractPeople = AbstractPeople;
