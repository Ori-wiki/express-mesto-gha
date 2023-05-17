const router = require('express').Router();

const { getCards, createCards, deleteCard } = require('../controllers/cards');

router.get('/cards', getCards);

router.post('/cards', createCards);

router.delete('/cards/:cardId', deleteCard);

module.exports = router;
