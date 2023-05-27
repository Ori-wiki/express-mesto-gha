const router = require('express').Router();
const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getUserInfo,
} = require('../controllers/users');

const {
  userIdValidation,
  updateUserValidation,
  updateAvatarValidation,
} = require('../middlewares/validation');

router.get('/users', getUsers);

router.get('/users/:id', userIdValidation, getUserById);

router.get('/users/me', getUserInfo);

router.patch('/users/me', updateUserValidation, updateProfile);

router.patch('/users/me/avatar', updateAvatarValidation, updateAvatar);

module.exports = router;
