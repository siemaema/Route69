const express = require('express');
const router = express.Router();

const GuestOrder = require('../models/GuestOrder');
const User = require('../models/Users');

const isAuthenticated = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

// POST /api/orders/guest — gość składa zamówienie
router.post('/guest', async (req, res) => {
  try {
    const order = new GuestOrder(req.body);
    const saved = await order.save();
    res.status(201).json({ message: "Zamówienie gościa zapisane", orderId: saved._id });
  } catch (err) {
    console.error("❌ Błąd zapisu zamówienia gościa:", err);
    res.status(500).json({ message: "Błąd zapisu zamówienia" });
  }
});

// GET /api/orders — admin: pobierz wszystkie zamówienia
router.get('/', isAuthenticated, checkRole("Admin"), async (req, res) => {
  try {
    const guestOrders = await GuestOrder.find();
    const users = await User.find().select("name surname email orders");

    const safeGuestOrders = Array.isArray(guestOrders) ? guestOrders : [];

    const safeUserOrders = users.map((u) => ({
      ...u._doc,
      orders: Array.isArray(u.orders) ? u.orders : [],
    }));

    res.status(200).json({
      guestOrders: safeGuestOrders,
      userOrders: safeUserOrders,
    });
  } catch (err) {
    console.error("❌ Błąd pobierania zamówień:", err);
    res.status(500).json({ message: "Błąd pobierania zamówień" });
  }
});


// PATCH /api/orders/guest/:id — admin: aktualizuj status zamówienia gościa
router.patch('/guest/:id', isAuthenticated, checkRole("Admin"), async (req, res) => {
  try {
    const updated = await GuestOrder.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "Zamówienie nie znalezione" });
    }
    res.status(200).json(updated);
  } catch (err) {
    console.error("❌ Błąd aktualizacji zamówienia:", err);
    res.status(500).json({ message: "Błąd aktualizacji zamówienia" });
  }
});

module.exports = router;
