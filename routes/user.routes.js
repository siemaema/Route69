const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
  logoutUser,
  getMe,
  getAllUsers,
  getUserComments
} = require('../controllers/user.controller');

const isAuthenticated = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

// 🔐 Aktualny użytkownik
router.get('/me', isAuthenticated, getMe);
router.patch('/me', isAuthenticated, updateUser);
router.post('/logout', isAuthenticated, logoutUser);

// 📩 Rejestracja / logowanie
router.post('/register', registerUser);
router.post('/login', loginUser);

// 🛠 Admin / komentarze
router.get('/:id/comments', isAuthenticated, checkRole("Admin"), getUserComments);

// 🛠 Admin – dostęp do wszystkich
router.get('/', isAuthenticated, checkRole("Admin"), getAllUsers);
router.get('/:id', getUser);
router.patch('/:id', isAuthenticated, updateUser);
router.delete('/:id', isAuthenticated, checkRole("Admin"), deleteUser);

module.exports = router;
