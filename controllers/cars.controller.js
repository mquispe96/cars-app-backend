const express = require('express');
const cars = express.Router();
const {getAllCars, getCar, createCar, updateCar, deleteCar} = require('../queries/cars.queries.js');
const {formatBody} = '../formatting/cars.formatting.js';
const {hasAllRequiredFields, validateFieldsDataTypes} = require('../validations/cars.validations.js');

cars.get('/', async (req, res) => {
  const allCars = await getAllCars();
  if(allCars[0]){
    res.status(200).json(allCars);
  } else {
    res.status(404).json({error: 'No cars found'});
  }
});

cars.get('/:id', async (req, res) => {
  const car = await getCar(req.params.id);
  if(car){
    res.status(200).json(car);
  } else {
    res.status(404).json({error: 'Car not found'});
  }
});

cars.post('/',hasAllRequiredFields, validateFieldsDataTypes, async (req, res) => {
  const formattedBody = formatBody(req.body);
  const car = await createCar(formattedBody);
  if(!car.id){
    res.status(400).json(car.error);
  } else {
    res.status(201).json(car.id);
  }
});

cars.put('/:id', hasAllRequiredFields, validateFieldsDataTypes, async (req, res) => {
  const formattedBody = formatBody(req.body);
  const car = await updateCar(req.params.id, formattedBody);
  if(!car.id){
    res.status(400).json(car.error);
  } else {
    res.status(200).json(car);
  }
});

cars.delete('/:id', async (req, res) => {
  const car = await deleteCar(req.params.id);
  if(car){
    res.status(200).json({success: 'Car deleted'});
  } else {
    res.status(404).json({error: 'Car not found'});
  }
});

module.exports = cars;
