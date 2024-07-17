const express = require('express');
const humps = require('humps');
const cars = express.Router();
const {
  getAllCars,
  getCar,
  createCar,
  updateCar,
  deleteCar,
} = require('../queries/cars.query.js');
const {formatBody} = require('../formatting/cars.formatting.js');
const {
  hasAllRequiredFields,
  validateFieldsDataTypes,
} = require('../validations/cars.validations.js');

cars.get('/', async (req, res) => {
  const allCars = await getAllCars();
  if (allCars[0]) {
    const jsObj = humps.camelizeKeys(allCars);
    res.status(200).json(jsObj);
  } else {
    res.status(404).json({error: 'No cars found'});
  }
});

cars.get('/:id', async (req, res) => {
  const car = await getCar(req.params.id);
  if (car.id) {
    const jsObj = humps.camelizeKeys(car);
    res.status(200).json(jsObj);
  } else {
    res.status(404).json({error: 'Car not found'});
  }
});

cars.post(
  '/',
  hasAllRequiredFields,
  validateFieldsDataTypes,
  async (req, res) => {
    const sqlObj = humps.decamelizeKeys(req.body);
    const formattedBody = formatBody(sqlObj);
    const car = await createCar(formattedBody);
    if (!car.id) {
      res.status(400).json(car.error);
    } else {
      const jsObj = humps.camelizeKeys(car);
      res.status(201).json(jsObj);
    }
  },
);

cars.put(
  '/:id',
  hasAllRequiredFields,
  validateFieldsDataTypes,
  async (req, res) => {
    const sqlObj = humps.decamelizeKeys(req.body);
    const formattedBody = formatBody(sqlObj);
    const car = await updateCar(req.params.id, formattedBody);
    if (!car.id) {
      res.status(400).json(car.error);
    } else {
      const jsObj = humps.camelizeKeys(car);
      res.status(200).json(jsObj);
    }
  },
);

cars.delete('/:id', async (req, res) => {
  const car = await deleteCar(req.params.id);
  if (car) {
    res.status(200).json({success: 'Car deleted'});
  } else {
    res.status(404).json({error: 'Car not found'});
  }
});

module.exports = cars;
