const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    author: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: String,
    rating: Number,
    date: String});

const DimensionSchema = new mongoose.Schema({
    height: Number,
    width: Number,
    depth: Number
})

const CompatibleProductSchema = new mongoose.Schema({
    productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    title: String
})
const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  promoPrice: { type: Number, default: null },

  inStock: { type: Boolean, default: true },
  stockCount: { type: Number, default: 0 },

  image: { type: String, required: true },
  category: String,
  subcategory: String,
  manufacturer: String,
  sku: String,
  tags: [String],
  colorCode: String,

  weight: String,
  volume: String,
  dimensions: DimensionSchema,

  rating: { type: Number, default: 0 },
  comments: [CommentSchema],

  materials: [String],
  applicationSurface: [String],
  usageInstructions: String,
  hazardCodes: [String],
  msdsLink: String,

  compatibleWith: [CompatibleProductSchema],
  seoKeywords: [String],

  isBanner: { type: Boolean, default: false },
  isBestseller: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Product", ProductSchema, "Products");
