const {getUsername} = require('../queries/users.query.js');

const usernameExists = (req, res, next) => {
  const {username, password} = req.body;
  const user = getUsername(username, password);
  if (!user) {
    return res.status(400).json({error: 'Invalid username or password'});
  }
  return next();
};

const validateUsername = (req, res, next) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const {email} = req.body;
  if (!regex.test(email)) {
    return res.status(400).json({error: 'Invalid email address format'});
  }
  return next();
};

const itsNewUsername = (req, res, next) => {
  const {username, password} = req.body;
  const user = getUsername(username, password);
  if (user) {
    return res.status(400).json({error: 'Username already exists'});
  }
  return next();
};

const hasAllFieldsRequired = (req, res, next) => {
  const requiredFields = ['username', 'password', 'email', 'lastName', 'firstName', 'birthDate'];
  const missingFields = requiredFields.filter(field => !req.body[field]);
  if(missingFields.length){
    return res.status(400).json({error: 'Missing fields: ' + missingFields.join(', ')});
  } 
  return next();
}

module.exports = {
  usernameExists,
  validateUsername,
  itsNewUsername,
  hasAllFieldsRequired,
};
