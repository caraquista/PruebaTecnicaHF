const {AbstractPeople} = require('./abstractPeople');
const config = require('../../config');
const {Planet} = require('../Planet');

class CommonPeople extends AbstractPeople {
    constructor(id, app) {
        super(id, app);
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
            const planetId = parseInt(commonPeople.homeworld.replace(/\D+/g, ''), 10);
            const planet = new Planet(planetId, this.app);
            await planet.init();

            this.homeworld_id = planetId;
            this.homeworld_name = planet.name;
        } else {
            this.homeworld_id = commonPeople.homeworld_id;
            this.homeworld_name = commonPeople.homeworld_name;
        }
        this.name = commonPeople.name;
        this.height = commonPeople.height;
        this.mass = commonPeople.mass;
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
}

exports.CommonPeople = CommonPeople;
