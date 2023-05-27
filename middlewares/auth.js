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

module.exports = (req, res, next) => {
  // достаём авторизационный заголовок
  const { authorization } = req.headers;

  // убеждаемся, что он есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    console.log('1');
    throw new AuthError('Необходима авторизация.');
  }

  // извлечём токен
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    // отправим ошибку, если не получилось
    console.log('2');
    throw new AuthError('Необходима авторизация.');
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
