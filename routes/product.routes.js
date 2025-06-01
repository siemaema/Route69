const express = require('express');
const router = express.Router();

const {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteProductComment,
  addCommentToProduct,
  editProductComment
} = require('../controllers/product.controller');

const isAuthenticated = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

// 🔓 Publiczne
router.get('/', getAllProducts);
router.get('/:id', getOneProduct);

// 🧪 Komentarze
router.post('/:id/comments', isAuthenticated, addCommentToProduct);
router.patch('/:productId/comments/:commentId', isAuthenticated, editProductComment);
router.delete('/:productId/comments/:commentId', isAuthenticated, checkRole("Admin"), deleteProductComment);

// 🔒 Admin-only
router.post('/', isAuthenticated, checkRole("Admin"), createProduct);
router.patch('/:id', isAuthenticated, checkRole("Admin"), updateProduct);
router.delete('/:id', isAuthenticated, checkRole("Admin"), deleteProduct);

module.exports = router;
