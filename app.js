require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { signUp, signIn } = require('./middlewares/validation');
const NotFoundError = require('./errors/NotFoundError');

const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

app.use(helmet());
app.disable('x-powered-by');

app.post('/signup', signUp, createUser);
app.post('/signin', signIn, login);

app.use('/', usersRoutes);
app.use('/', cardsRoutes);

app.use(auth);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемая страница не найдена'));
});

app.use(errors());
app.use(errorHandler);

app.listen(PORT);
