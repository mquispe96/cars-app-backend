const express = require('express');
const humps = require('humps');
const users = express.Router();
const {
  usernameExists,
  validateUsername,
  itsNewUsername,
  hasAllFieldsRequired,
} = require('../validations/users.validations.js');
const {formatData} = require('../formatting/users.formatting.js');

const {
  getUsername,
  createUser,
  updateUser,
  deleteUser,
  getFavorites,
  addFavorite,
  removeFavorite,
  getComments,
  addComment,
  editComment,
  deleteComment,
} = require('../queries/users.query.js');

users.get('/', (req, res) => res.status(403).json({error: 'Access denied'}));

users.post('/login', usernameExists, async (req, res) => {
  const {username, password} = req.body;
  const user = humps.camelizeKeys(await getUsername(username, password));
  res.status(200).json(user);
});

users.post(
  '/register',
  validateUsername,
  itsNewUsername,
  hasAllFieldsRequired,
  async (req, res) => {
    const sqlObj = humps.decamelizeKeys(req.body);
    const fomattedData = formatData(sqlObj);
    const user = humps.camelizeKeys(await createUser(fomattedData));
    res.status(201).json(user);
});

users.put('/change-password', usernameExists, async (req, res) => {
  const sqlObj = humps.decamelizeKeys(req.body);
  const user = humps.camelizeKeys(await updateUser(sqlObj));
  res.status(200).json(user);
});

users.delete('/delete', usernameExists, async (req, res) => {
  const {username, password} = req.body;
  const user = await deleteUser(username, password);
  if (user) {
    res.status(200).json({message: 'User deleted'});
  } else {
    res.status(500).json({error: 'Internal server error'});
  }
});

users.get('/favorites/:id', async (req, res) => {
  const {id} = req.params;
  const favorites = humps.camelizeKeys(await getFavorites(id));
  res.status(200).json(favorites);
});

users.post('/add-favorite', async (req, res) => {
  const sqlObj = humps.decamelizeKeys(req.body);
  const favorite = humps.camelizeKeys(await addFavorite(sqlObj));
  if(favorite.id) {
    const favorites = humps.camelizeKeys(await getFavorites(sqlObj.user_id));
    res.status(201).json(favorites);
  } else {
    res.status(500).json({error: 'Internal server error'});
  }
});

users.delete('/remove-favorite/:user/:car', async (req, res) => {
  const {user, car} = req.params;
  const favorite = humps.camelizeKeys(await removeFavorite({user_id: user, car_id: car}));
  if(favorite.id) {
    const favorites = humps.camelizeKeys(await getFavorites(user));
    res.status(200).json(favorites);
  } else {
    res.status(500).json({error: 'Internal server error'});
  }
});

users.get('/comments/:id', async (req, res) => {
  const {id} = req.params;
  const comments = humps.camelizeKeys(await getComments(id));
  if(comments.length) {
    res.status(200).json(comments);
  } else {
    res.status(404).json({error: 'No comments found'});
  }
});

users.post('/add-comment', async (req, res) => {
  const sqlObj = humps.decamelizeKeys(req.body);
  const comment = humps.camelizeKeys(await addComment(sqlObj));
  if(comment.id) {
    const comments = humps.camelizeKeys(await getComments(sqlObj.car_id));
    res.status(201).json(comments);
  } else {
    res.status(500).json({error: 'Internal server error'});
  }
});

users.put('/edit-comment', async (req, res) => {
  const sqlObj = humps.decamelizeKeys(req.body);
  const comment = humps.camelizeKeys(await editComment(sqlObj));
  if(comment.id) {
    const comments = humps.camelizeKeys(await getComments(sqlObj.car_id));
    res.status(200).json(comments);
  } else {
    res.status(500).json({error: 'Internal server error'});
  }
});

users.delete('/delete-comment/:id/:car', async (req, res) => {
  const {id, car} = req.params;
  const comment = humps.camelizeKeys(await deleteComment(id));
  if(comment.id) {
    const comments = humps.camelizeKeys(await getComments(car));
    res.status(200).json(comments);
  } else {
    res.status(500).json({error: 'Internal server error'});
  }
});

module.exports = users;
