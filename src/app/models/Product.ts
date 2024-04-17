import mongoose from "mongoose";
import { Document } from "mongoose";

export interface Product extends Document {
  name: string;
  description: string;
  price: number;
  countInStock: number;
  imageUrl: string;
  rating: number;
  numReviews: number;
  category: string;
  brand: string;
  user: string;
}

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  countInStock: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  rating: { type: Number, required: true },
  numReviews: { type: Number, required: true },
  category: { type: String, required: true },
  brand: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

// The former: if have, use it
// The latter: if not, create it
const Product =
  mongoose.models.Product || mongoose.model<Product>("Product", productSchema, "sample_mflix");

export default Product;
