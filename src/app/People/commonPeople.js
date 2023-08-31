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

            this.homeworlId = planetId;
            this.homeworldName = planet.name;
        } else {
            this.homeworlId = commonPeople.homeworlId;
            this.homeworldName = commonPeople.homeworldName;
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
                homeworlId: this.homeworlId,
                homeworldName: this.homeworldName
            });
        }
    }
}

exports.CommonPeople = CommonPeople;
