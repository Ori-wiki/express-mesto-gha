const router = require('express').Router();

const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getUserInfo,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/:id', getUserById);

router.patch('/users/me', updateProfile);

router.patch('/users/me/avatar', updateAvatar);

router.get('/users/me', getUserInfo);

module.exports = router;
