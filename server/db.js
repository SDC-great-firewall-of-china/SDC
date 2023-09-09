const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)

const productsSchema = new mongoose.Schema({
  id: Number,
  campus: String,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
  created_at: Date,
  updated_at: Date,
  features: Array
});

const featuresSchema = new mongoose.Schema({
  id: Number,
  product_id: Number,
  feature: String,
  value: String
})

const photosSchema = new mongoose.Schema({
  id: Number,
  styleId: Number,
  url: String,
  thumbnail_url: String
})

const skusSchema = new mongoose.Schema({
  id: Number,
  styleId: Number,
  size: String,
  quantity: Number
})

const stylesSchema = new mongoose.Schema({
  id: Number,
  productId: Number,
  name: String,
  sale_price: String,
  original_price: String,
  default_style: Boolean,
});

const reviewsSchema = new mongoose.Schema({
  id: Number,
  product_id: Number,
  rating: String,
  date: String,
  summary: String,
  body: String,
  recommended: Boolean,
  reported: Boolean,
  reviewer_name: String,
  reveiwer_email: String,
  response: String,
  helpfulness: Number
});

const Products = mongoose.model('products', productsSchema);
const Features = mongoose.model('features', featuresSchema);
const Photos = mongoose.model('photos', photosSchema);
const Skus = mongoose.model('skus', skusSchema);
const Styles = mongoose.model('styles', stylesSchema);
const Reviews = mongoose.model('reviews', reviewsSchema);

module.exports  = {
  products: Products,
  features: Features,
  photos: Photos,
  skus: Skus,
  styles: Styles,
  // reviews: Reviews
}