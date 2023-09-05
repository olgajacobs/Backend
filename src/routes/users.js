const routerUsers = require('express').Router();
const { getUsers, getUser, createUser, updateUser, deleteUser } = require('../controllers/users');

routerUsers.get('/users', getUsers);
routerUsers.get('/users/:user_id', getUser);
routerUsers.post('/users', createUser);
routerUsers.patch('/users/:user_id', updateUser);
routerUsers.delete('/users/:user_id', deleteUser);

module.exports = routerUsers;
