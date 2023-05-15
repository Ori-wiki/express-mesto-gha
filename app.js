const express = require('express');
const mongoose = require('mongoose');
const usersRoutes = require('./routes/users');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
// подключаем логгер запросов
app.use('/', usersRoutes);
// роуты, которым нужна авторизация
// app.use('/', require('./routes/users'));

// запрос к несуществующему роуту

// подключаем логгер ошибок

app.listen(PORT);
