const router = require('express').Router();
const { createCardValidation, cardIdValidation } = require('../middlewares/validation');

const {
  getCards,
  createCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);

router.post('/cards', createCardValidation, createCards);

router.delete('/cards/:cardId', cardIdValidation, deleteCard);

router.put('/cards/:cardId/likes', cardIdValidation, likeCard);

router.delete('/cards/:cardId/likes', cardIdValidation, dislikeCard);

module.exports = router;
