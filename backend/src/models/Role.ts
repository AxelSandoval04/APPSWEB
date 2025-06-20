import { Document, Schema, model } from 'mongoose';

export interface IRole extends Document {
  type: string;
  createDate: Date;
  deleteDate: Date | null;
  status: boolean;
}

const RoleSchema = new Schema<IRole>({
  type: { type: String, required: true },
  createDate: { type: Date, default: Date.now },
  deleteDate: { type: Date, default: null },
  status: { type: Boolean, default: true }
});

export const Role = model<IRole>('Role', RoleSchema);