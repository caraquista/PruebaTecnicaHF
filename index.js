require('dotenv').config();
console.clear();
// require('./src');

console.log("Starting");

const express = require('express');
const app = express();
app.get('/', (req, res) => {
	res.send('Welcome to Holafly\'s Technical test!');
});
exports.app = app;