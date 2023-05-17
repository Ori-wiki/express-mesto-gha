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
  const { name, link } = req.body;
  User.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card));
};

module.exports = { createUser, getUsers, getUserById };
