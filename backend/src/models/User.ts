import { Document, Types, Schema, model } from 'mongoose';

const acceptedRoles = ['user', 'admin', 'moderator']; // Arreglo de roles aceptados

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string; // Cambiado a string para aceptar cualquier valor del arreglo
  phone: string;
  createDate: Date;
  deleteDate: Date | null;
  status: boolean;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: acceptedRoles, // Usar el arreglo para definir los valores aceptados
    default: 'user' 
  },
  phone: { type: String, required: true },
  createDate: { type: Date, default: Date.now },
  deleteDate: { type: Date, default: null },
  status: { type: Boolean, default: true } 
});

export const User = model<IUser>('User', UserSchema);