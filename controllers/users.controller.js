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

const {getUsername, createUser, updateUser, deleteUser} = require('../queries/users.query.js');

users.get('*', (req, res) => res.status(403).json({error: 'Access denied'}));

users.post('/login', usernameExists, (req, res) => {
  const {username, password} = req.body;
  const user =  humps.camelizeKeys(getUsername(username, password));
  res.status(200).json(user);
});

users.post('/register', validateUsername, itsNewUsername, hasAllFieldsRequired, (req, res) =>{
  const sqlObj = humps.decamelizeKeys(req.body);
  const fomattedData = formatData(sqlObj);
  const user = humps.camelizeKeys(createUser(fomattedData));
  res.status(201).json(user);
});

users.put('/change-password', usernameExists,(req, res) => {
  const sqlObj = humps.decamelizeKeys(req.body);
  const user = humps.camelizeKeys(updateUser(sqlObj));
  res.status(200).json(user);
});

users.delete('/delete', usernameExists, (req, res) => {
  const {username, password} = req.body;
  const user = deleteUser(username, password);
  if(user){
    res.status(200).json({message: 'User deleted'});
  } else {
    res.status(500).json({error: 'Internal server error'});
  }
});

module.exports = users;
