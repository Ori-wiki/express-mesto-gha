const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const MangoEmailError = require('../errors/MangoEmailError');
// const AuthError = require('../errors/AuthError');

// const { NODE_ENV, JWT_SECRET = 'dev-key' } = process.env;
// NODE_ENV=production
// JWT_SECRET=eb28135ebcfc17578f96d4d65b6c7871f2c803be4180c165061d5c2db621c51b

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};
const getUserById = (req, res, next) => {
  const { _id } = req.params;
  User.findById(_id)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        throw new BadRequestError('Переданы некорректные данные');
      } else {
        next(e);
      }
    })
    .catch(next);
};
const createUser = (req, res, next) => {
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
    .then((user) => {
      res.status(201).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id.toString(),
        email: user.email,
      });
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        throw new BadRequestError('Переданы неверные данные');
      } else if (e.code === 11000) {
        throw new MangoEmailError('Пользователь с таким email уже зарегистрирован');
      } else {
        next(e);
      }
    })
    .catch(next);
  // const {
  //   name, about, avatar, email, password,
  // } = req.body;

  // bcrypt
  //   .hash(password, 10)
  //   .then((hash) => User.create({
  //     name,
  //     about,
  //     avatar,
  //     email,
  //     password: hash,
  //   }))
  //   .then((user) => res.status(201).send({
  //     name: user.name,
  //     about: user.about,
  //     avatar: user.avatar,
  //     email: user.email,
  //     _id: user._id,
  //   }))
  //   .catch((err) => {
  //     if (err.name === 'ValidationError') {
  //       return next(new BadRequestError('Неправильные данные.'));
  //     }
  //     if (err.code === 11000) {
  //       return next(new MangoEmailError('Данный email уже зарегистрирован.'));
  //     }
  //     return next(err);
  //   });
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.status(200).send(user);
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        throw new BadRequestError('Переданы неправильные данные');
      } else {
        next(e);
      }
    })
    .catch(next);
};
const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.status(200).send(user);
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        throw new BadRequestError('Переданы неправильные данные');
      } else {
        next(e);
      }
    })
    .catch(next);
};
const login = (req, res, next) => {
  // const { email, password } = req.body;
  // User.findUserByCredentials({ email, password })
  //   .then((user) => {
  //     if (!user) {
  //       throw new NotFoundError('Пользователь не найден');
  //     } else {
  //       const token = jwt.sign(
  //         { _id: user._id },
  //         NODE_ENV === 'production' ? JWT_SECRET : 'dev-key',
  //         { expiresIn: '7d' },
  //       );
  //       res.status(200).send({ token });
  //     }
  //   })
  //   .catch(() => {
  //     throw new AuthError('Неправильный логин или пароль');
  //   })
  //   .catch(next);
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.status(200).send({
        token: jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' }),
      });
    })
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      return res.send(user);
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        throw new BadRequestError('Переданы неправильные данные');
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
