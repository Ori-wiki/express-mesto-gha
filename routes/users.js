// const router = require('express').Router();
// const {
//   getUsers,
//   getUserById,
//   updateProfile,
//   updateAvatar,
//   getUserInfo,
// } = require('../controllers/users');

// const {
//   userIdValidation,
//   updateUserValidation,
//   updateAvatarValidation,
// } = require('../middlewares/validation');

// const auth = require('../middlewares/auth');

// router.use(auth);

// router.get('/users', getUsers);

// router.get('/users/me', getUserInfo);

// router.get('/users/:id', userIdValidation, getUserById);

// router.patch('/users/me', updateUserValidation, updateProfile);

// router.patch('/users/me/avatar', updateAvatarValidation, updateAvatar);

// module.exports = router;

const router = require('express').Router();
const {
  userIdValidation,
  updateUserValidation,
  updateAvatarValidation,
} = require('../middlewares/validation');
const {
  getUsers, getUser, getMe, updateProfile, updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getMe);
router.get('/:userId', userIdValidation, getUser);
router.patch('/me', updateUserValidation, updateProfile);
router.patch('/me/avatar', updateAvatarValidation, updateAvatar);

module.exports = router;
