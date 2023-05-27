require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const { createUser, login } = require('./controllers/users');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

app.use(helmet());
app.disable('x-powered-by');

app.use((req, res, next) => {
  req.user = {
    _id: '6464f2d56381cf4b88d4aa88',
  };
  next();
});

app.post('/signin', login);
app.post('/signup', createUser);

app.use('/', usersRoutes);
app.use('/', cardsRoutes);

app.use('*', (req, res, next) => {
  res.status(404).send({ message: 'Запрашиваемая страница не найдена' });
  next();
});

app.listen(PORT);
