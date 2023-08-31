

const bodyParser = require('body-parser');

const {createExpressServer: createServer} = require('./server');

const app = require('./app');

const config = require('./config');

async function start() {
	const server = await createServer(app);

	server.get('/', (req, res) => {
		res.send('Welcome to Holafly\'s Technical test!');
	});

	// Start the GraphQL server
  const port = config.port || 4567;
	server.listen(port , () => {
		// eslint-disable-next-line no-console
		console.log(`Server is running on port: ${port}`);
	});

}

start();