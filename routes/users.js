const router = require('express').Router();

router.get('/users', (req, res) => {
  res.send(users);
});
router.get('/users/:id', () => {});
router.post('/users, () => {}');

module.exports = router;
