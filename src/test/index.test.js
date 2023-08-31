require('dotenv').config({path: '.env_test', override: true});
const request = require('supertest');
const { createExpressServer } = require('../server');
const app = require('../app');
// server/index');

describe('All Test', () => {

    let application = null;
    beforeAll(async () => {
        application = await createExpressServer(app);
    });
    test('getLogs with only one result', async () => {
        const response = await request(application)
        .get('/hfswapi/getLogs')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json');
        const {body} = response;
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBe(1);
        body.forEach((object) => {
            expect(object).toHaveProperty('id');
            expect(object).toHaveProperty('action');
            expect(object).toHaveProperty('header');
            expect(object).toHaveProperty('ip');
            expect(object).toHaveProperty('createdAt');
            expect(object).toHaveProperty('updatedAt');
        });
    });
    test('getLogs with only two result', async () => {
        const response = await request(application)
        .get('/hfswapi/getLogs')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json');
        const {body} = response;
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBe(2);
        body.forEach((object) => {
            expect(object).toHaveProperty('id');
            expect(object).toHaveProperty('action');
            expect(object).toHaveProperty('header');
            expect(object).toHaveProperty('ip');
            expect(object).toHaveProperty('createdAt');
            expect(object).toHaveProperty('updatedAt');
        });
    });
    test('getLogs with only three result', async () => {
        const response = await request(application)
        .get('/hfswapi/getLogs')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json');
        const {body} = response;
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBe(3);
        body.forEach((object) => {
            expect(object).toHaveProperty('id');
            expect(object).toHaveProperty('action');
            expect(object).toHaveProperty('header');
            expect(object).toHaveProperty('ip');
            expect(object).toHaveProperty('createdAt');
            expect(object).toHaveProperty('updatedAt');
        });
    });
    test('getPeople without get it from service', async () => {
        const response = await request(application)
        .get('/hfswapi/getPeople/1')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json');
        const {body} = response;
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(body)).toBe(false);
        expect(body).toHaveProperty('name');
        expect(body).toHaveProperty('height');
        expect(body).toHaveProperty('mass');
        expect(body).toHaveProperty('homeworldName');
        expect(body).toHaveProperty('homeworldId');
    });
    test('getPeople exact result', async () => {
        const response = await request(application)
        .get('/hfswapi/getPeople/1')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json');
        const {body} = response;
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(body)).toBe(false);
        expect(JSON.stringify(body)).toBe('{"name":"Luke Skywalker","height":172,"mass":77,"homeworldName":"Tatooine","homeworldId":1}');
        expect(body).toHaveProperty('height');
        expect(body).toHaveProperty('mass');
        expect(body).toHaveProperty('homeworldName');
        expect(body).toHaveProperty('homeworldId');
    });
    test('getPeople get it from service', async () => {
        const response = await request(application)
        .get('/hfswapi/getPeople/15')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json');
        const {body} = response;
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(body)).toBe(false);
        expect(body).toHaveProperty('name');
        expect(body).toHaveProperty('height');
        expect(body).toHaveProperty('mass');
        expect(body).toHaveProperty('homeworldName');
        expect(body).toHaveProperty('homeworldId');
    });
    test('getPeople get it from service in wookiee format', async () => {
        const response = await request(application)
        .get('/hfswapi/getPeople/15?format=wookiee')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json');
        const {body} = response;
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(body)).toBe(false);
        expect(body).toHaveProperty('name');
        expect(body).toHaveProperty('height');
        expect(body).toHaveProperty('mass');
        expect(body).toHaveProperty('homeworldName');
        expect(body).toHaveProperty('homeworldId');
    });
    test('getPeople get it from service', async () => {
        const response = await request(application)
        .get('/hfswapi/getPeople/17')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json');
        const {body} = response;
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(body)).toBe(false);
        expect(JSON.stringify(body)).toBe('{}');
    });
    test('getPeople fail to get it bad id', async () => {
        const response = await request(application)
        .get('/hfswapi/getPeople/1a')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json');
        expect(response.statusCode).toBe(500);
    });
    test('getPlanet without get it from service', async () => {
        const response = await request(application)
        .get('/hfswapi/getPlanet/1')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json');
        const {body} = response;
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(body)).toBe(false);
        expect(body).toHaveProperty('name');
        expect(body).toHaveProperty('gravity');
    });
    test('getPlanet exact result', async () => {
        const response = await request(application)
        .get('/hfswapi/getPlanet/1')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json');
        const {body} = response;
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(body)).toBe(false);
        expect(JSON.stringify(body)).toBe('{"name":"Tatooine","gravity":1}');
        expect(body).toHaveProperty('name');
        expect(body).toHaveProperty('gravity');
    });
    test('getPlanet get it from service', async () => {
        const response = await request(application)
        .get('/hfswapi/getPlanet/15')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json');
        const {body} = response;
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(body)).toBe(false);
        expect(body).toHaveProperty('name');
        expect(body).toHaveProperty('gravity');
    });
    test('getPlanet fail to get it bad id', async () => {
        const response = await request(application)
        .get('/hfswapi/getPlanet/1a')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json');
        expect(response.statusCode).toBe(500);
    });
    let count = 0;
    while (count < 10) {
        // eslint-disable-next-line no-loop-func
        test('getWeightOnPlanetRandom get it from service error and success', async () => {
            const response = await request(application)
            .get('/hfswapi/getWeightOnPlanetRandom')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json');
            const {body} = response;
            if (response.statusCode === 200) {
                expect(response.statusCode).toBe(200);
                expect(Array.isArray(body)).toBe(false);
                expect(body).toHaveProperty('weightOnPlanet');
                expect(body).toHaveProperty('planet');
                expect(body.planet).toHaveProperty('name');
                expect(body.planet).toHaveProperty('gravity');
                expect(body).toHaveProperty('person');
                expect(body.person).toHaveProperty('name');
                expect(body.person).toHaveProperty('height');
                expect(body.person).toHaveProperty('mass');
                expect(body.person).toHaveProperty('homeworldName');
                expect(body.person).toHaveProperty('homeworldId');
            } else {
                expect(response.statusCode).toBe(409);
                expect(Array.isArray(body)).toBe(false);
            }
        });
        count += 1;
    }
    test('getLogs with only many result', async () => {
        const response = await request(application)
        .get('/hfswapi/getLogs')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json');
        const {body} = response;
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBeGreaterThan(10);
        body.forEach((object) => {
            expect(object).toHaveProperty('id');
            expect(object).toHaveProperty('action');
            expect(object).toHaveProperty('header');
            expect(object).toHaveProperty('ip');
            expect(object).toHaveProperty('createdAt');
            expect(object).toHaveProperty('updatedAt');
        });
    });

});
