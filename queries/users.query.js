const db = require('../db/dbConfig.js');

const getUsername = async (username, password) => {
  try {
    const user = await db.one(
      'SELECT username, email, first_name, last_name, birth_date, created_at FROM users WHERE username=$1 AND password=$2',
      [username, password],
    );
    return user;
  } catch (error) {
    return error;
  }
};

const createUser = async user => {
  try {
    const newUser = await db.one(
      'INSERT INTO users (username, password, email, first_name, last_name, birth_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING username, email, first_name, last_name, birth_date, created_at',
      [
        user.username,
        user.password,
        user.email,
        user.first_name,
        user.last_name,
        user.birth_date,
      ],
    );
    return newUser;
  } catch (error) {
    return error;
  }
};

const updateUser = async user => {
  try {
    const updatedUser = await db.one(
      'UPDATE users SET password=$2 WHERE id=$1 RETURNING username, email, first_name, last_name, birth_date, created_at',
      [user.id, user.password],
    );
    return updatedUser;
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

const getFavorites = async id => {
  try {
    const favorites = await db.any(
      'SELECT array_agg(car_id) AS car_ids FROM favorites WHERE user_id=$1',
      [id],
    );
    return favorites[0];
  } catch (error) {
    return error;
  }
};

const addFavorite = async favorite => {
  try {
    const updateFavorite = await db.one(
      'INSERT INTO favorites (user_id, car_id) VALUES ($1, $2) RETURNING *',
      [favorite.user_id, favorite.car_id],
    );
    return updateFavorite;
  } catch (error) {
    return error;
  }
};

const removeFavorite = async favorite => {
  try {
    const updateFavorite = await db.one(
      'DELETE FROM favorites WHERE user_id=$1 AND car_id=$2 RETURNING *',
      [favorite.user_id, favorite.car_id],
    );
    return updateFavorite;
  } catch (error) {
    return error;
  }
};

const getComments = async id => {
  try {
    const comments = await db.any('SELECT * FROM comments WHERE car_id=$1', [
      id,
    ]);
    return comments;
  } catch (error) {
    return error;
  }
};

const addComment = async comment => {
  try {
    const newComment = await db.one(
      'INSERT INTO comments (user_id, car_id, comment) VALUES ($1, $2, $3) RETURNING *',
      [comment.user_id, comment.car_id, comment.comment],
    );
    return newComment;
  } catch (error) {
    return error;
  }
};

const editComment = async comment => {
  try {
    const updatedComment = await db.one(
      'UPDATE comments SET comment=$3 WHERE user_id=$1 AND car_id=$2 RETURNING *',
      [comment.user_id, comment.car_id, comment.comment],
    );
    return updatedComment;
  } catch (error) {
    return error;
  }
};

const deleteComment = async comment => {
  try {
    const deletedComment = await db.one(
      'DELETE FROM comments WHERE user_id=$1 AND car_id=$2 RETURNING *',
      [comment.user_id, comment.car_id],
    );
    return deletedComment;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getUsername,
  createUser,
  updateUser,
  deleteUser,
  addFavorite,
  removeFavorite,
  getFavorites,
  getComments,
  addComment,
  editComment,
  deleteComment,
};
