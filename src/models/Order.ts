import { Document, Schema, model, Types } from 'mongoose';

export interface IOrder extends Document {
  creationDate: Date;
  user: Types.ObjectId; // User who created the order
  total: number;
  subtotal: number;
  createDate: Date;
  deleteDate: Date | null;
  status: boolean;
}

const OrderSchema = new Schema<IOrder>({
  creationDate: { type: Date, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  total: { type: Number, required: true },
  subtotal: { type: Number, required: true },
  createDate: { type: Date, default: Date.now },
  deleteDate: { type: Date, default: null },
  status: { type: Boolean, default: true }
});

export const Order = model<IOrder>('Order', OrderSchema);