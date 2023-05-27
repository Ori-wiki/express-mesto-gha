// const jwt = require('jsonwebtoken');
// const AuthError = require('../errors/AuthError');

// const { JWT_SECRET } = process.env;

// const extractBearerToken = function (header) {
//   return header.replace('Bearer ', '');
// };

// const auth = (req, res, next) => {
//   const { authorization } = req.headers;
//   if (!authorization || !authorization.startsWith('Bearer ')) {
//     throw new AuthError('Необходима авторизация');
//   }

//   const token = extractBearerToken(authorization);
//   let payload;

//   try {
//     payload = jwt.verify(token, JWT_SECRET);
//   } catch (err) {
//     throw new AuthError('Необходима авторизация');
//   }

//   req.user = payload;

//   return next();
// };

// module.exports = auth;

const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthError('Пользователь не авторизован!'));
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    return next(new AuthError('Пользователь не авторизован!'));
  }

  req.user = payload;

  return next();
};
