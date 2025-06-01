const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

app.use(session({
  secret: process.env.SESSION_SECRET || 'tajny_klucz',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: false,
    secure: false,
    sameSite: 'lax',
  },
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions',
  }),
}));

// 🔗 Trasy
const productRoutes = require('./routes/product.routes.js');
const userRoutes = require('./routes/user.routes.js');
const sessionRoutes = require('./routes/session.routes.js'); // ⬅️ DODANE
const orderRoutes = require('./routes/order.routes.js');


app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/session', sessionRoutes); // ⬅️ DODANE

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Połączono z bazą danych'))
  .catch((err) => console.error('❌ Błąd połączenia z bazą danych:', err));

app.use((req, res) => {
  res.status(404).json({ message: "Nie znaleziono endpointu" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server działa na porcie ${PORT}`);
});
