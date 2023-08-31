const request = require('supertest');
const { app } = require('../index');

describe('Ramdon Module', () => {
    test('adds 1 + 2 to equal 3', () => {
        expect(1 + 2).toBe(3);
    });

    test.skip(' request basic', async () => {
        const response = await request(app)
        .get('/hfswapi/getLogs')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json');
        const {body} = response;
        expect(body.statusCode).toBe(200);
        expect(body.message).toBe('Authorization header is missing');
    });
});
