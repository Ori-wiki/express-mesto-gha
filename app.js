const mongoose = require('mongoose');
const path = require('path');
const express = require('express');
// const { setNoCacheHeaders } = require('./middlewares');
const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(setNoCacheHeaders);

app.listen(PORT, () => {
  console.log(`Ссылка на сервер ${PORT}`);
});
