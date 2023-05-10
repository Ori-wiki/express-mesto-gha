const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// подключаем логгер запросов

// роуты, которым нужна авторизация
// app.use('/', require('./routes/users'));

// запрос к несуществующему роуту

// подключаем логгер ошибок

app.listen(PORT);
