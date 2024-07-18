const db = require('../db/dbConfig.js');

const getUsername = async (username, password) => {
  try {
    const user = await db.one(
      'SELECT * FROM users WHERE username=$1 AND password=$2',
      [username, password],
    );
    const userData = await db.one(
      'SELECT * FROM user_favorite_cars WHERE user_id=$1',
      [user.id],
    );
    return userData;
  } catch (error) {
    return error;
  }
};

const createUser = async (user) => {
  try {
    const newUser = await db.one(
      'INSERT INTO users (username, password, email, first_name, last_name, birth_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [user.username, user.password, user.email, user.first_name, user.last_name, user.birth_date],
    );
    const newUserData = await getUsername(newUser.username, newUser.password);
    return newUserData;
  } catch (error) {
    return error;
  }
};

const updateUser = async (user) => {
  try {
    const updatedUser = await db.one(
      'UPDATE users SET password=$2 WHERE id=$1 RETURNING *',
      [user.id, user.password],
    );
    const updatedUserData = await getUsername(updatedUser.username, updatedUser.password);
    return updatedUserData;
  } catch (error) {
    return error;
  }
};

const deleteUser = async (username, password) => {
  try {
    const user = await db.one(
      'DELETE FROM users WHERE username=$1 AND password=$2 RETURNING *',
      [username, password],
    );
    return user;
  } catch (error) {
    return error;
  }
};

module.exports = {getUsername, createUser, updateUser, deleteUser};
