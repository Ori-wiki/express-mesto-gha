const path = require('path');
const express = require('express');
const { setNoCacheHeaders } = require('./middlewares');

const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(setNoCacheHeaders);

app.listen(PORT, () => {
  console.log('Ссылка на сервер');
  console.log(BASE_PATH);
});
