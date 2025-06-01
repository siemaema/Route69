const express = require('express');
const router = express.Router();

const ensureSessionCart = (req) => {
  if (!req.session.cart) {
    req.session.cart = [];
  }
};

router.get('/cart', (req, res) => {
  ensureSessionCart(req);
  res.status(200).json(req.session.cart);
});

router.post('/cart', (req, res) => {
  req.session.cart = req.body;
  res.status(200).json({ message: 'Koszyk zapisany do sesji' });
});

router.delete('/cart', (req, res) => {
  req.session.cart = [];
  res.status(200).json({ message: 'Koszyk wyczyszczony' });
});

module.exports = router;
