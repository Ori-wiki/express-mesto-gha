// const router = require('express').Router();

// const {
//   getCards,
//   createCards,
//   deleteCard,
//   likeCard,
//   dislikeCard,
// } = require('../controllers/cards');

// const { createCardValidation, cardIdValidation } = require('../middlewares/validation');

// const auth = require('../middlewares/auth');

// router.use(auth);

// router.get('/cards', getCards);

// router.post('/cards', createCardValidation, createCards);

// router.delete('/cards/:cardId', cardIdValidation, deleteCard);

// router.put('/cards/:cardId/likes', cardIdValidation, likeCard);

// router.delete('/cards/:cardId/likes', cardIdValidation, dislikeCard);

// module.exports = router;

const router = require('express').Router();
const { createCardValidation, cardIdValidation } = require('../middlewares/validation');

const {
  getCards, createCard, deleteCard, addLike, removeLike,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCardValidation, createCard);
router.delete('/:cardId', cardIdValidation, deleteCard);
router.put('/:cardId/likes', cardIdValidation, addLike);
router.delete('/:cardId/likes', cardIdValidation, removeLike);

module.exports = router;
