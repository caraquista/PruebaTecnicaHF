const applySwapiEndpoints = require('./swapiEndpoints');

const applyEndpoints = async (server, app) => {
	await applySwapiEndpoints(server, app);
	return server;
};

module.exports = applyEndpoints;