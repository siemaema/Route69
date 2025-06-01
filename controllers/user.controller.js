const User = require('../models/Users.js');
const Product = require('../models/Products.js');
const bcrypt = require('bcryptjs');
const mergeCarts = require('../utils/mergeCarts');

// 🔍 Komentarze użytkownika
const getUserComments = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).lean();
    if (!user) return res.status(404).json({ message: "Użytkownik nie znaleziony" });

    const products = await Product.find({ "comments.userId": userId }).lean();

    const userComments = [];

    for (const product of products) {
      const comments = product.comments
        .filter(comment => comment.userId?.toString() === userId)
        .map(comment => ({
          ...comment, // poprawnie rozpakowany komentarz
          productId: product._id,
          productTitle: product.title
        }));

      userComments.push(...comments); // poprawnie dopisane do listy
    }

    res.status(200).json(userComments);
  } catch (err) {
    console.error("❌ Błąd pobierania komentarzy użytkownika:", err);
    res.status(500).json({ message: "Błąd serwera" });
  }
};


// 🔐 Rejestracja użytkownika
const registerUser = async (req, res) => {
  try {
    const { name, surname, email, password } = req.body;
    if (!name || !surname || !email || !password) {
      return res.status(400).json({ message: "Wszystkie dane są wymagane" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Użytkownik już istnieje" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      surname,
      email,
      password: hashedPassword,
      role: "User"
    });

    const saved = await newUser.save();

    req.session.user = {
      id: saved._id,
      email: saved.email,
      name: saved.name,
      role: saved.role
    };

    // Po rejestracji: scal koszyk sesji
    if (req.session.cart?.length > 0) {
      saved.cart = mergeCarts(req.session.cart, []);
      await saved.save();
      req.session.cart = [];
    }

    res.status(201).json({
      message: "Zarejestrowano i zalogowano",
      user: req.session.user
    });
  } catch (err) {
    console.error("❌ Błąd rejestracji użytkownika:", err);
    res.status(500).json({ message: "Błąd serwera" });
  }
};

// 🔐 Logowanie
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email i hasło są wymagane" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Użytkownik nie znaleziony" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Niepoprawny email lub hasło" });
    }

    req.session.user = {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role
    };

    res.status(200).json({ message: "Zalogowano", user: req.session.user });
  } catch (err) {
    console.error("❌ Błąd logowania:", err);
    res.status(500).json({ message: "Błąd serwera" });
  }
};

// 👤 Pobierz dane 1 użytkownika
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "Użytkownik nie znaleziony" });
    res.status(200).json(user);
  } catch (err) {
    console.error("❌ Błąd pobierania użytkownika:", err);
    res.status(500).json({ message: "Błąd serwera" });
  }
};

// ✏️ Aktualizacja
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id === "me" || !req.params.id
      ? req.session.user.id
      : req.params.id;

    const updates = { ...req.body };

    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const updated = await User.findByIdAndUpdate(userId, updates, {
      new: true
    }).select("-password");

    if (!updated) return res.status(404).json({ message: "Nie znaleziono użytkownika" });

    res.status(200).json(updated);
  } catch (err) {
    console.error("❌ Błąd aktualizacji użytkownika:", err);
    res.status(500).json({ message: "Błąd serwera" });
  }
};

// ❌ Usunięcie
const deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Nie znaleziono użytkownika" });

    res.status(200).json({ message: "Użytkownik usunięty pomyślnie" });
  } catch (err) {
    console.error("❌ Błąd usuwania użytkownika:", err);
    res.status(500).json({ message: "Błąd serwera" });
  }
};

// 🔚 Wylogowanie
const logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Wylogowano" });
  });
};

// 👤 Dane aktualnego zalogowanego użytkownika
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.session.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "Użytkownik nie znaleziony" });
    res.status(200).json(user);
  } catch (err) {
    console.error("❌ Błąd pobierania danych użytkownika:", err);
    res.status(500).json({ message: "Błąd serwera" });
  }
};

// 📋 Wszyscy użytkownicy (admin)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    console.error("❌ Błąd pobierania wszystkich użytkowników:", err);
    res.status(500).json({ message: "Błąd serwera" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
  logoutUser,
  getMe,
  getAllUsers,
  getUserComments
};
