const express = require('express');
const applyEndpoints = require('./endpoints');
const applyMiddlewares = require('./middlewares');
const server = express();

const createExpressServer = async app => {
	
	await applyMiddlewares(server, app);
	await applyEndpoints(server, app);
    
    await app.db.initDB();
	await app.db.populateDB();

	server.get('/', async (req, res) => {
		if(process.env.NODE_ENV === 'develop'){
				res.send('Test Enviroment');
		} else {
		    res.sendStatus(200);
		}
    });

	return server;
};

module.exports = {
	createExpressServer,
	server
};
