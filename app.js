require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const { errors } = require('celebrate');
// const helmet = require('helmet');
// // const usersRoutes = require('./routes/users');
// // const cardsRoutes = require('./routes/cards');
// // const { createUser, login } = require('./controllers/users');
// // const auth = require('./middlewares/auth');
// // const { signUp, signIn } = require('./middlewares/validation');
// // const NotFoundError = require('./errors/NotFoundError');
// const { requestLogger, errorLogger } = require('./middlewares/logger');
// const errorHandler = require('./middlewares/errorHandler');
// const router = require('./routes');

// const { PORT = 3000 } = process.env;
// const app = express();

// mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors());
// app.use(helmet());
// app.disable('x-powered-by');

// app.use(requestLogger);
// app.use(router);
// app.use(errorLogger);

// // app.use('*', (req, res, next) => {
// //   next(new NotFoundError('Запрашиваемая страница не найдена'));
// // });

// app.use(errors());
// app.use(errorHandler);

// app.listen(PORT);

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const process = require('process');
const { ERROR_DEFAULT, MESSAGE_DEFAULT } = require('./utils/constants');
const cards = require('./routes/cards');
const users = require('./routes/users');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');
const { signUp, signIn } = require('./middlewares/validation');
const { PORT, DB_CONNECT = 'mongodb://127.0.0.1:27017/mestodb' } = require('./config');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
const app = express();

process.on('uncaughtException', (err, origin) => {
  console.log(
    `${origin} ${err.name} c текстом ${err.message} не была обработана. Обратите внимание!`,
  );
});

mongoose.connect(DB_CONNECT, {
  useNewUrlParser: true,
});

app.use(helmet());
app.use(express.json());
app.use(limiter);

app.post('/signin', signIn, login);
app.post('/signup', signUp, createUser);

app.use(auth);

app.use('/', cards);
app.use('/', users);
app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена.'));
});

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = ERROR_DEFAULT, message = MESSAGE_DEFAULT } = err;
  res.status(statusCode).send({ message });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
