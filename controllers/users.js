const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((e) => res.status(500).send({ message: `Ошибка получения пользователей ${e}` }));
};
const getUserById = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .orFail(() => {
      res.status(404).send({ message: 'Пользователь не найден' });
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        res.status(400).send({ message: `Переданы некорректные данные ${e}` });
      } else {
        res.status(500).send({ message: `Ошибка получения пользователя ${e}` });
      }
    });
};
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы неверные данные' });
      } else {
        res.status(500).send({ message: `Ошибка создания пользователя ${e}` });
      }
    });
};
const updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Пользователь не найден' });
        return;
      }
      res.status(200).send(user);
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы неверные данные' });
      } else {
        res.status(500).send({ message: `Ошибка создания пользователя ${e}` });
      }
    });
};
const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Пользователь не найден' });
        return;
      }
      res.status(200).send(user);
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы неверные данные' });
      } else {
        res.status(500).send({ message: `Ошибка создания пользователя ${e}` });
      }
    });
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
};
