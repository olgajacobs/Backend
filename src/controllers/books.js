const Book = require('../models/book');

const getBooks = (request, response) => {
  Book.find({})
    .then((data) => {
      response.status(200).send(data);
    })
    .catch((e) => response.status(500).send(e.message));
};

const getBook = (request, response) => {
  const { book_id } = request.params;
  Book.findById(book_id)
    .then((existingBook) => {
      if (!existingBook) {
        response.status(404).send(`Book with ID: ${user_id} not found`);
      }
      Book.findById(book_id)
        .then((book) => {
          response.status(200).send(book);
        })
        .catch((e) => response.status(500).send(e.message));
    })
    .catch((e) => response.status(404).send(`Book with ID: ${book_id} not found`));
};

const createBook = (request, response) => {
  Book.create({ ...request.body })
    .then((book) => {
      response.status(201).send(book);
    })
    .catch((e) => response.status(500).send(e.message));
};

const updateBook = (request, response) => {
  const { book_id } = request.params;
  Book.findById(book_id)
    .then((existingBook) => {
      if (!existingBook) {
        response.status(404).send(`Book with ID: ${user_id} not found`);
      }
      Book.findByIdAndUpdate(book_id, { ...request.body })
        .then((book) => {
          response.status(200).send(book);
        })
        .catch((e) => response.status(500).send(e.message));
    })
    .catch((e) => response.status(404).send(`Book with ID: ${book_id} not found`));
};

const deleteBook = (request, response) => {
  const { book_id } = request.params;
  Book.findById(book_id)
    .then((existingBook) => {
      if (!existingBook) {
        response.status(404).send(`Book with ID: ${user_id} not found`);
      }
      Book.findByIdAndDelete(book_id)
        .then((book) => {
          response.status(200).send('Deleted');
        })
        .catch((e) => response.status(500).send(e.message));
    })
    .catch((e) => response.status(404).send(`Book with ID: ${book_id} not found`));
};

module.exports = { getBooks, getBook, createBook, updateBook, deleteBook };
