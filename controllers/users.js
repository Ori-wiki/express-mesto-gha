const User = require('../models/user');

module.exports.getUser = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};
module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => res.status(200).send(user))
    .catch(next);
};
module.exports.createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(next);
};
