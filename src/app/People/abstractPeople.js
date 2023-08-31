const config = require('../../config');
const {Planet} = require('../Planet');

class AbstractPeople {

    constructor(id, app) {
        if (this.constructor === AbstractPeople) {
            throw new Error('Abstract classes can\'t be instantiated.');
        }
        this.app = app;
        this.id = id;
    }

    async init() {
        let crearRegistro = false;
        let commonPeople = await this.app.db.swPeople.findOne({
            where: { id: this.id },
        });

        if (commonPeople === null) {
            crearRegistro = true;
            commonPeople = await this.app.swapiFunctions.genericRequest(
                `${config.url_external_service}${config.prefix_person}${this.id}`,
                'GET',
                null,
                config.logging_active
            );
            if (commonPeople.detail !== 'Not found') {
                const planetId = parseInt(commonPeople.homeworld.replace(/\D+/g, ''), 10);
                const planet = new Planet(planetId, this.app);
                await planet.init();

                this.homeworld_id = planetId;
                this.homeworld_name = planet.name;
                this.mass = parseFloat(commonPeople.mass.replace(/\D+/g, ''))?.toFixed(2) || 0.0;
            }
        } else {
            this.mass = commonPeople.mass;
            this.homeworld_id = commonPeople.homeworld_id;
            this.homeworld_name = commonPeople.homeworld_name;
        }
        this.name = commonPeople.name;
        this.height = commonPeople.height;
        if (crearRegistro) {
            await this.app.db.swPeople.create({
                id: this.id,
                name: this.name,
                height: this.height,
                mass: this.mass,
                homeworld_id: this.homeworld_id,
                homeworld_name: this.homeworld_name
            });
        }
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

    async getWeightOnPlanet(planetId) {
        const planet = new Planet(planetId, this.app);
        await planet.init();
        let mass = 'N/A';
        if (!isNaN(this.getMass()) && !isNaN(planet.getGravity())) {
            mass = this.app.swapiFunctions.getWeightOnPlanet(this.getMass(), planet.getGravity());
        }
        return {
            weightOnPlanet: mass,
            planet: {
                name: planet.getName(),
                gravity: planet.getGravity()
            }
        };
    }
}

exports.AbstractPeople = AbstractPeople;
