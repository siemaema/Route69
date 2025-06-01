const mongoose = require('mongoose');

const GuestOrderSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  address: {
    city: String,
    street: String,
    buildingNr: String,
    flatNr: String,
    postalCode: String,
  },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
      totalItemsPrice: Number,
    },
  ],
  totalPrice: Number,
  date: { type: Date, default: Date.now },
  status: { type: String, default: "Oczekujące" }
});

module.exports = mongoose.model("GuestOrder", GuestOrderSchema, "GuestOrders");
