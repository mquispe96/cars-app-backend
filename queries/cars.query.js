const db = require('../db/dbConfig');

async function getAllCars() {
  try {
    const allCars = await db.any('SELECT * FROM cars');
    return allCars;
  } catch (error) {
    return error;
  }
}

async function getCar(id) {
  try {
    const oneCar = await db.one('SELECT * FROM cars WHERE id=$1', id);
    return oneCar;
  } catch (error) {
    return error;
  }
}

async function createCar(car) {
  const query =
    'INSERT INTO cars (year, make, trim, model, color, price, img_url, discontinued) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';

  const values = [
    car.year,
    car.make,
    car.trim,
    car.model,
    car.color,
    car.price,
    car.img_url,
    car.discontinued,
  ];

  try {
    const newCar = await db.one(query, values);
    return newCar;
  } catch (error) {
    return error;
  }
}

async function updateCar(id, car) {
  const query =
    'UPDATE cars SET year=$2, make=$3, trim=$4, model=$5, color=$6, price=$7, img_url=$8, discontinued=$9 WHERE id=$1 RETURNING *';

  const values = [
    id,
    car.year,
    car.make,
    car.trim,
    car.model,
    car.color,
    car.price,
    car.img_url,
    car.discontinued,
  ];

  try {
    const newCar = await db.one(query, values);
    return newCar;
  } catch (error) {
    return error;
  }
}

async function deleteCar(id) {
  try {
    const deletedCar = await db.one('DELETE FROM cars WHERE id=$1 RETURNING *', id);
    return deletedCar;
  } catch (error) {
    return error;
  }
}

module.exports = {
  getAllCars,
  getCar,
  createCar,
  updateCar,
  deleteCar,
};
