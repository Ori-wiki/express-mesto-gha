const appAuth = require('express').Router();
const { login, createUser } = require('../controllers/users');

// ok
appAuth.post('/signup', createUser);
appAuth.post('/signin', login);

module.exports = appAuth;
