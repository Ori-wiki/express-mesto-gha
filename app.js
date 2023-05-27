require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const helmet = require('helmet');
// const usersRoutes = require('./routes/users');
// const cardsRoutes = require('./routes/cards');
// const { createUser, login } = require('./controllers/users');
// const auth = require('./middlewares/auth');
// const { signUp, signIn } = require('./middlewares/validation');
// const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const router = require('./routes');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.disable('x-powered-by');

app.use(requestLogger);
app.use(router);
app.use(errorLogger);

// app.use('*', (req, res, next) => {
//   next(new NotFoundError('Запрашиваемая страница не найдена'));
// });

app.use(errors());
app.use(errorHandler);

app.listen(PORT);
