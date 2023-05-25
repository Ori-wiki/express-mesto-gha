const express = require('express');
const mongoose = require('mongoose');
const router = require('express').Router();
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '6464f2d56381cf4b88d4aa88',
  };
  next();
});

app.use('/', usersRoutes);
app.use('/', cardsRoutes);

router.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемая страница не найдена' });
});

app.listen(PORT);

//  _id 64626f207e958112c2d7252c
