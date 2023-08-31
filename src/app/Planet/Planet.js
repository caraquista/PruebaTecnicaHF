const config = require('../../config');
const db = require('../db');
const { genericRequest } = require('../swapiFunctions');

class Planet {
    constructor(id) {
        this.id = id;
    }

    async init() {
        let crearRegistro = false;
        let planet = await db.swPlanet.findOne({
          where: { id: this.id },
        });

        if (planet === null) {
            crearRegistro = true;
            planet = await genericRequest(
                `${config.url_external_service}${config.prefix_planet}${this.id}`,
                'GET',
                null,
                config.logging_active
            );
            this.gravity = parseFloat(planet.gravity.replace(/[^\d.]*/g, '')) || 0.0;
        } else {
            this.gravity = planet.gravity;
        }
        this.name = planet.name;

        if (crearRegistro) {
            await db.swPlanet.create({
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
