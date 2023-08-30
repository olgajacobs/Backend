const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const bookRouter = require('./routes/books');
const loggerOne = require('./middlewares/loggerOne');

dotenv.config();
const { PORT = 3005, API_URL = 'http://127.0.0.1', MONGO_DB = 'mongodb://127.0.0.1:27017/library' } = process.env;
const handleError = (error) => {
  //   console.error(error);
};
mongoose.connect(MONGO_DB).catch((error) => handleError(error));
console.log('Mongo ok');

const app = express();

app.use(cors());
app.use(loggerOne);
app.use(bodyParser.json());
app.use(userRouter);
app.use(bookRouter);
app.listen(PORT, () => {
  console.log(`Сервер запущен по адресу ${API_URL}:${PORT}`);
});
