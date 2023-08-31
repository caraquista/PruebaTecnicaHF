const { Planet } = require('../../app/Planet/');
const {peopleFactory} = require('../../app/People');
const config = require('../../config');

const _isWookieeFormat = (req) => {
    if (req.query.format && req.query.format === 'wookiee') {
        return true;
    }
    return false;
};

const applySwapiEndpoints = (server, app) => {

    server.get('/hfswapi/test', async (req, res) => {
        const data = await app.swapiFunctions.genericRequest('https://swapi.dev/api/', 'GET', null, true);
        res.send(data);
    });

    server.get('/hfswapi/getPeople/:id', async (req, res) => {
        try {
            let id = req.params.id;
            let lang = (_isWookieeFormat(req)) ? 'wookiee' : 'imperial';
            const person = await peopleFactory(id, lang, app);
            res.send({
                name: person.getName(),
                height: person.getHeight(),
                mass: person.getMass(),
                homeworldName: person.getHomeworldName(),
                homeworldId: person.getHomeworlId(),
            });
        } catch (err) {
            res.sendStatus(500, err);
        }
    });

    server.get('/hfswapi/getPlanet/:id', async (req, res) => {
        try {
            let id = req.params.id;
            const planet = new Planet(id, app);
            await planet.init();
            res.send({
                name: planet.getName(),
                gravity: planet.getGravity(),
            });
        } catch (err) {
            res.sendStatus(500, err);
        }
    });

    server.get('/hfswapi/getWeightOnPlanetRandom', async (req, res) => {
        try {
            let idPerson = parseInt(Math.floor((Math.random() * config.max_random_number) + 1), 10);
            let idPlanet = parseInt(Math.floor((Math.random() * config.max_random_number) + 1), 10);
            const person = await peopleFactory(idPerson, '', app);
            if (person.getHomeworlId() === idPlanet) {
                res.sendStatus(409, 'No se puede calcular el peso de una persona en su pais natal.');
            } else {
                const mass = await person.getWeightOnPlanet(idPlanet);
                res.send({
                    ...mass,
                    person: {
                        name: person.getName(),
                        height: person.getHeight(),
                        mass: person.getMass(),
                        homeworldName: person.getHomeworldName(),
                        homeworldId: person.getHomeworlId()
                    }
                });
            }
        } catch (err) {
            res.sendStatus(500, err);
        }
    });

    server.get('/hfswapi/getLogs', async (req, res) => {
        const data = await app.db.logging.findAll();
        res.send(data);
    });
};

module.exports = applySwapiEndpoints;
