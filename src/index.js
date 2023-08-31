

// const bodyParser = require('body-parser');

// const createServer = require('./server');

// const app = require('./app');

// const config = require('./config');

// async function start() {
// 	const server = await createServer(app);

//   server.get('/', (req, res) => {
//     res.send('Welcome to Holafly\'s Technical test!');
//   });

// 	// Start the GraphQL server
//   const port = config.port || 4567;
// 	server.listen(port , () => {
// 		// eslint-disable-next-line no-console
// 		console.log(`Server is running on port: ${port}`);
// 	});

// }

// start();
require('dotenv').config();
console.clear();
const moduleLoader = require('./utils/modulesLoader');
const moduleLoggingRoute = require('./modules/logging/routes');
// require('./src');

console.log("Starting 123");

const express = require('express');
const app = express();
app.get('/', (req, res) => {
	res.send('Welcome to Holafly\'s Technical test!');
});

exports.moduleLoggingRoute = moduleLoader.loader(moduleLoggingRoute, {mountPath: '/hfswapi/getLogs'}, app)
exports.app = app;