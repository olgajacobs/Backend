const routerLibrary = require('express').Router();
const { getBooks, changeBook } = require('../controllers/library');

routerLibrary.get('/users/:user_id/books', getBooks);
routerLibrary.patch('/users/:user_id/books/:book_id', changeBook);

module.exports = routerLibrary;
