const User = require('../models/user');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};
const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => res.status(200).send(user))
    .catch(next);
};
const createUser = (req, res) => {
  User.create(req.body).then((user) => res.status(201).send(user));
  // .catch((e) =>
  //   res.status(500).send({ message: `error creating user ${e}` })
  // );
};

module.exports = { createUser, getUsers, getUserById };
