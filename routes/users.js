const router = require('express').Router();
const {
  userIdValidation,
  updateUserValidation,
  updateAvatarValidation,
} = require('../middlewares/validation');
const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getUserInfo,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/me', getUserInfo);

router.get('/users/:_id', userIdValidation, getUserById);

router.patch('/users/me', updateUserValidation, updateProfile);

router.patch('/users/me/avatar', updateAvatarValidation, updateAvatar);

module.exports = router;
