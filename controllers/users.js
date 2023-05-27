const bcrypt = require('bcryptjs');

const { NODE_ENV, JWT_SECRET = 'dev-key' } = process.env;
// NODE_ENV=production
// JWT_SECRET=eb28135ebcfc17578f96d4d65b6c7871f2c803be4180c165061d5c2db621c51b

const jwt = require('jsonwebtoken');
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
  const {
    name, about, avatar, email,
  } = req.body;
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(201).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      _id: user._id,
      email: user.email,
    }))
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
const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials({ email, password })
    .then((user) => {
      if (!user) {
        // throw new NotFoundError('Пользователь по указанному _id не найден.');
        res.status(400).send({ message: 'Переданы неверные данные' });
      } else {
        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : 'dev-key',
          { expiresIn: '7d' },
        );
        res.send({ token });
      }
    })
    .catch(() => {
      res.status(400).send({ message: 'Переданы неверные данные' });
    })
    .catch(next);
};
const getUserInfo = (req, res, next) => {
  const id = req.user._id;
  User.findById(id)
    .then((user) => {
      if (!user) {
        // throw new NotFoundError('Пользователь по указанному _id не найден.');
        res.status(500).send({ message: 'Ошибка создания пользователя' });
      }
      return res.send(user);
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        // throw new BadRequestError('Переданы некорректные данные');
        res.status(500).send({ message: `Ошибка создания пользователя ${e}` });
      } else {
        next(e);
      }
    })
    .catch(next);
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  login,
  getUserInfo,
};
