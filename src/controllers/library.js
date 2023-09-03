const User = require('../models/user');
const Book = require('../models/book');
const mongoose = require('mongoose');

const getBooks = (request, response) => {
  const { user_id } = request.params;
  User.findById(user_id)
    .then((existingUser) => {
      if (!existingUser) {
        // Если пользователя нет, возвращаем 404
        return response.status(404).send(`User with ID: ${user_id} not found`);
      }
      User.findById(user_id)
        .then((user) => {
          response.status(200).send(user.mybooks);
        })
        .catch((e) => response.status(500).send(e.message));
    })
    .catch((e) => response.status(404).send(`User with ID: ${user_id} not found`));
};

const changeBook = async (request, response) => {
  const { user_id, book_id } = request.params;

  let existingUser, existingBook;
  // Проверка правильности ID книги
  try {
    existingBook = await Book.findById(book_id);
    if (!existingBook) {
      return response.status(404).send(`Book** with ID: ${book_id} not found`);
    }
  } catch (e) {
    return response.status(404).send(`Book with ID: ${book_id} not found`);
  }
  // Проверка правильности ID пользователя
  try {
    existingUser = await User.findById(user_id);
    if (!existingUser) {
      return response.status(404).send(`User with ID: ${user_id} not found`);
    }
  } catch (e) {
    return response.status(404).send(`User with ID: ${user_id} not found`);
  }

  // Проверка наличия запрошенной книги в списке пользователя
  // Если книги в списке нет то размер массива не изменится и мы добавляем книгу.
  let newBooks = existingUser.mybooks.filter((book) => !book._id.equals(existingBook._id));
  if (newBooks.length === existingUser.mybooks.length) {
    // Проверяем свободна ли запрошенная книга
    try {
      user = await User.findOne().where('mybooks._id').equals(existingBook._id);
      console.log(user);
      if (user) {
        return response.status(400).send(`This book was taken by user ${user?.name} ${user?.surname}`);
      } else {
        newBooks = [...newBooks, existingBook];
      }
    } catch (e) {
      return response.status(500).send(e.message);
    }
  }

  existingUser.mybooks = newBooks;

  User.findByIdAndUpdate(user_id, existingUser, { new: true })
    .then((user) => {
      response.status(201).send(user);
    })
    .catch((e) => response.status(500).send(e.message));
};

module.exports = { getBooks, changeBook };
