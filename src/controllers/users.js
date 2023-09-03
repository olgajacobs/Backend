const User = require('../models/user');

const getUsers = (request, response) => {
  return User.find({})
    .then((data) => {
      response.status(200).send(data);
    })
    .catch((e) => response.status(500).send(e.message));
};

const getUser = (request, response) => {
  const { user_id } = request.params;
  User.findById(user_id)
    .then((existingUser) => {
      if (!existingUser) {
        // Если пользователя нет, возвращаем 404
        return response.status(404).send(`User with ID: ${user_id} not found`);
      }
      User.findById(user_id)
        .then((user) => {
          response.status(200).send(user);
        })
        .catch((e) => response.status(500).send(e.message));
    })
    .catch((e) => response.status(404).send(`User with ID: ${user_id} not found`));
};

const createUser = (request, response) => {
  User.create({ ...request.body })
    .then((user) => {
      response.status(201).send(user);
    })
    .catch((e) => response.status(500).send(e.message));
};

const updateUser = async (request, response) => {
  const { user_id } = request.params;
  let existingUser;
  try {
    existingUser = await User.findById(user_id);
    if (!existingUser) {
      return response.status(404).send(`User with ID: ${user_id} not found`);
    }
  } catch (e) {
    return response.status(404).send(`User with ID: ${user_id} not found`);
  }

  User.findByIdAndUpdate(user_id, { ...request.body }, { new: true })
    .then((user) => {
      response.status(200).send(user);
    })
    .catch((e) => response.status(500).send(e.message));
};

const deleteUser = (request, response) => {
  const { user_id } = request.params;
  User.findById(user_id)
    .then((existingUser) => {
      if (!existingUser) {
        // Если пользователя нет, возвращаем 404
        return response.status(404).send(`User with ID: ${user_id} not found`);
      }
      return User.findByIdAndDelete(user_id)
        .then((user) => {
          response.status(200).send('Deleted');
        })
        .catch((e) => response.status(500).send(e.message));
    })
    .catch((e) => response.status(404).send(`User with ID: ${user_id} not found`));
};

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };
