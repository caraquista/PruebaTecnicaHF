const AbstractPeople = require('./abstractPeople');
export class CommonPeople extends AbstractPeople {
    constructor(id) {
        super(id);
    }

    async init() {
        let people = await this.db.swPeople.findOne({
            where: { id: this.id },
        });

        if (people === null) {
            people = await this.app.swapiFunctions.genericRequest(
            `${URL_SWAPI}/people/${this.id}`,
            'GET',
            null,
            true
            );
        }

        const world = await this.app.swapiFunctions.genericRequest(
            people.homeworld,
            'GET',
            null
        );

        this.name = people.name;
        this.height = people.height;
        this.mass = people.mass;
        this.homeworlId = people.homeworld.split('/')[5];
        this.homeworldName = world.name;
    }
}
