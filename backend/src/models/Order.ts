import { Document, Schema, model, Types } from 'mongoose';

// Subdocument schema for products in an order
const OrderProductSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
}, { _id: false });

export interface IOrderProduct {
  product: Types.ObjectId;
  quantity: number;
  price: number;
}

export interface IOrder extends Document {
  creationDate: Date;
  user: Types.ObjectId;
  products: IOrderProduct[];
  total: number;
  subtotal: number;
  createDate: Date;
  deleteDate: Date | null;
  status: string; // Cambiado de boolean a string
}

const OrderSchema = new Schema<IOrder>({
  creationDate: { type: Date, default: Date.now }, // Establecer automáticamente si no se proporciona
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  products: { type: [OrderProductSchema], required: true, validate: [(arr: any[]) => arr.length > 0, 'At least one product is required'] },
  total: { type: Number, required: true },
  subtotal: { type: Number, required: true },
  createDate: { type: Date, default: Date.now },
  deleteDate: { type: Date, default: null },
  status: { type: String, enum: ["Pendiente", "En proceso", "Pagado", "Cancelado"], default: "Pendiente" } // Cambiado de boolean a string con valores específicos
});

export const Order = model<IOrder>('Order', OrderSchema);