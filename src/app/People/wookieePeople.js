const { AbstractPeople } = require('./abstractPeople');
const config = require('../../config');

class WookieePeople extends AbstractPeople {
    constructor(id, app) {
        super(id, app);
    }
    async init() {
        let people = await this.app.swapiFunctions.genericRequest(
            `${config.url_external_service}${config.prefix_person}${this.id}${config.suffix_wookie}`,
              'GET',
              null,
              config.logging_active
            );
          const idPlanet = parseInt(people.acooscwoohoorcanwa.replace(/\D+/g, ''), 10);
          const planet = await this.app.swapiFunctions.genericRequest(
            `${config.url_external_service}${config.prefix_planet}${idPlanet}${config.suffix_wookie}`,
            'GET',
            null,
            config.logging_active
          );
          this.name = people.whrascwo;
          this.height = people.acwoahrracao;
          this.mass = people.scracc;
          this.homeworld_id = idPlanet;
          this.homeworld_name = planet.whrascwo;
    }
}

exports.WookieePeople = WookieePeople;

