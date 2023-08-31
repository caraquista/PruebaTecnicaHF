const {AbstractPeople} = require('./abstractPeople');
const config = require('../../config');
const db = require('../db');
const { genericRequest, getWeightOnPlanet } = require('../swapiFunctions');
const {Planet} = require('../Planet');

class CommonPeople extends AbstractPeople {
    constructor(id) {
        super(id);
    }

    async init() {
        let crearRegistro = false;
        let commonPeople = await db.swPeople.findOne({
            where: { id: this.id },
        });

        if (commonPeople === null) {
            crearRegistro = true;
            commonPeople = await genericRequest(
                `${config.url_external_service}${config.prefix_person}${this.id}`,
                'GET',
                null,
                config.logging_active
            );
            if (commonPeople.detail !== 'Not found') {
                const planetId = parseInt(commonPeople.homeworld.replace(/\D+/g, ''), 10);
                const planet = new Planet(planetId);
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
            await db.swPeople.create({
                id: this.id,
                name: this.name,
                height: this.height,
                mass: this.mass,
                homeworld_id: this.homeworld_id,
                homeworld_name: this.homeworld_name
            });
        }
    }

    async getWeightOnPlanet(planetId) {
        const planet = new Planet(planetId);
        await planet.init();
        let mass = 'N/A';
        if (!isNaN(this.getMass()) && !isNaN(planet.getGravity())) {
            mass = getWeightOnPlanet(this.getMass(), planet.getGravity());
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

exports.CommonPeople = CommonPeople;
