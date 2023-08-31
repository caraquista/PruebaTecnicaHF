const config = require('../../config');

class Planet {
    constructor(id, app) {
        this.id = id;
        this.app = app;
    }

    async init() {
        let crearRegistro = false;
        let planet = await this.app.db.swPlanet.findOne({
          where: { id: this.id },
        });

        if (planet === null) {
            crearRegistro = true;
            planet = await this.app.swapiFunctions.genericRequest(
                `${config.url_external_service}${config.prefix_planet}${this.id}`,
                'GET',
                null
            );
            this.gravity = parseFloat(planet.gravity.replace(/[^\d.]*/g, '')) || 0.0;
        } else {
            this.gravity = planet.gravity;
        }
        this.name = planet.name;

        if (crearRegistro) {
            await this.app.db.swPlanet.create({
                id: this.id,
                name: this.name,
                gravity: this.gravity
            });
        }
      }

    getName() {
        return this.name;
    }

    getGravity() {
        return this.gravity;
    }
}

exports.Planet = Planet;
