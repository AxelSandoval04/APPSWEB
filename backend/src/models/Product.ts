import { Document, Schema, model } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  stock: number;
  createDate: Date;
  deleteDate: Date | null;
  status: boolean;
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  createDate: { type: Date, default: Date.now },
  deleteDate: { type: Date, default: null },
  status: { type: Boolean, default: true }
});

export const Product = model<IProduct>('Product', ProductSchema);