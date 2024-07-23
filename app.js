const express = require('express');
const cors = require('cors');
const carsController = require('./controllers/cars.controller.js');
const usersController = require('./controllers/users.controller.js');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/cars', carsController);
app.use('/users', usersController);

app.get('/', (req, res) => res.send('Welcome to Cars App!'));
app.get('*', (req, res) => res.status(404).send('404 Not Found'));

module.exports = app;
