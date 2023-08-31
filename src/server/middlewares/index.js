const loggingMiddleware = require('./loggingMiddleware');

const applyMiddlwares = async (server, app) => {
    await server.use(loggingMiddleware(app.db));
	return server;
};

module.exports = applyMiddlwares;