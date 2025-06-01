const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  city: String,
  street: String,
  buildingNr: String,
  flatNr: String,
  postalCode: String,
});

const CartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: { type: Number, default: 1 },
  totalItemsPrice: Number,
});

const OrderSchema = new mongoose.Schema({
  orderId: String,
  status: String,
  date: String,
  items: [CartItemSchema],
  totalPrice: Number,
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },

  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, default: "" },

  address: AddressSchema,
  role: { type: String, default: "User", enum: ["User", "Admin"] },

  AccImg: { type: String, default: "" },

  wishList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  cart: [CartItemSchema],
  orders: [OrderSchema],
  createdAt: { type: Date, default: Date.now }
});

// 👇 tutaj trzeci argument wymusza użycie kolekcji "Users"
module.exports = mongoose.model("User", UserSchema, "Users");
