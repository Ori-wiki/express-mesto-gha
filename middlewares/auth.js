const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

// const { JWT_SECRET } = process.env;

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthError('Пользователь не авторизован!'));
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, 'super-secret-key');
  } catch (err) {
    return next(new AuthError('Пользователь не авторизован!'));
  }

  req.user = payload;

  return next();
};
