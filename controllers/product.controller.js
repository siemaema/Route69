const Product = require('../models/Products.js');

// 📥 Pobierz wszystkie produkty
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(Array.isArray(products) ? products : []);
  } catch (err) {
    console.error("❌ Błąd pobierania produktów:", err);
    res.status(500).json({ message: "Błąd pobierania produktów" });
  }
};
  

// 📥 Jeden produkt
const getOneProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Produkt nie znaleziony" });
    res.status(200).json(product);
  } catch (err) {
    console.error("❌ Błąd pobierania produktu:", err);
    res.status(500).json({ message: "Błąd pobierania produktu" });
  }
};

// ➕ Dodaj nowy produkt
const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Błąd dodawania produktu:", err);
    res.status(500).json({ message: "Błąd podczas zapisu" });
  }
};

// ✏️ Aktualizuj produkt
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) return res.status(404).json({ message: "Produkt nie znaleziony" });
    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error("❌ Błąd aktualizacji produktu:", err);
    res.status(500).json({ message: "Błąd podczas aktualizacji produktu" });
  }
};

// ❌ Usuń produkt
const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Produkt nie znaleziony" });
    res.status(200).json({ message: "Produkt usunięty pomyślnie" });
  } catch (err) {
    console.error("❌ Błąd usuwania produktu:", err);
    res.status(500).json({ message: "Błąd podczas usuwania produktu" });
  }
};

// ➕ Dodaj komentarz do produktu
const addCommentToProduct = async (req, res) => {
  const { text, rating } = req.body;
  const productId = req.params.id;

  if (!text || typeof rating !== "number") {
    return res.status(400).json({ message: "Treść i ocena są wymagane" });
  }

  if (!req.session?.user) {
    return res.status(403).json({ message: "Brak autoryzacji" });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Produkt nie znaleziony" });

    const comment = {
      author: req.session.user.email,
      userId: req.session.user.id,
      text,
      rating,
      date: new Date().toISOString()
    };

    product.comments.push(comment);

    // 🔁 Przeliczanie średniej oceny:
    const sum = product.comments.reduce((acc, c) => acc + (c.rating || 0), 0);
    product.rating = parseFloat((sum / product.comments.length).toFixed(1));

    await product.save();

    res.status(201).json({ message: "Dodano komentarz", comment });
  } catch (err) {
    console.error("❌ Błąd dodawania komentarza:", err);
    res.status(500).json({ message: "Błąd serwera" });
  }
};


// ✏️ Edytuj komentarz (admin lub autor)
const editProductComment = async (req, res) => {
  const { productId, commentId } = req.params;
  const { text, rating } = req.body;

  if (!text || typeof rating !== "number") {
    return res.status(400).json({ message: "Treść i ocena są wymagane" });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Produkt nie znaleziony" });

    const comment = product.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: "Komentarz nie znaleziony" });

    const isAdmin = req.session.user.role === "Admin";
    const isOwner = comment.userId?.toString() === req.session.user.id;

    if (!isAdmin && !isOwner) {
      return res.status(403).json({ message: "Brak uprawnień do edycji komentarza" });
    }

    comment.text = text;
    comment.rating = rating;
    comment.date = new Date().toISOString();

    // 🔁 Przeliczanie średniej oceny po edycji
    const sum = product.comments.reduce((acc, c) => acc + (c.rating || 0), 0);
    product.rating = parseFloat((sum / product.comments.length).toFixed(1));

    await product.save();
    res.status(200).json({ message: "Komentarz zaktualizowany", comment });
  } catch (err) {
    console.error("❌ Błąd edycji komentarza:", err);
    res.status(500).json({ message: "Błąd serwera" });
  }
};


// ❌ Usuń komentarz (admin)
const deleteProductComment = async (req, res) => {
  const { productId, commentId } = req.params;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Produkt nie znaleziony" });

    // Usuń komentarz z tablicy
    product.comments = product.comments.filter(c => c._id.toString() !== commentId);

    // 🔁 Przeliczanie średniej oceny po usunięciu
    if (product.comments.length > 0) {
      const sum = product.comments.reduce((acc, c) => acc + (c.rating || 0), 0);
      product.rating = parseFloat((sum / product.comments.length).toFixed(1));
    } else {
      product.rating = 0; // lub null jeśli wolisz brak oceny
    }

    await product.save();
    res.status(200).json({ message: "Komentarz usunięty" });
  } catch (err) {
    console.error("❌ Błąd usuwania komentarza:", err);
    res.status(500).json({ message: "Błąd serwera" });
  }
};


module.exports = {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  addCommentToProduct,
  editProductComment,
  deleteProductComment
};
