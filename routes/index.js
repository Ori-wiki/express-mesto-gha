const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const { createUser, login } = require('../controllers/users');
const { signIn, signUp } = require('../middlewares/validation');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signup', signIn, createUser);
router.post('/signin', signUp, login);

router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use(() => {
  throw new NotFoundError('Ресурс по указанному адресу не найден');
});

module.exports = router;
