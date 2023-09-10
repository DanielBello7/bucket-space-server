import ADMIN from '@/interfaces/admin.interface';
import mongoose from "mongoose";
import paginate from 'mongoose-paginate-v2';

const AdminSchema = new mongoose.Schema<ADMIN>({
  userId: {
    type: String,
    ref: "users",
    required: true
  },
  level: {
    type: Number,
    required: true,
    min: 1,
    max: 2
  }
}, { timestamps: true });

AdminSchema.set("toJSON", {
  transform(_doc, ret) {
    delete ret.__v;
  },
});

AdminSchema.plugin(paginate);
const AdminModel = mongoose.model<ADMIN, mongoose.PaginateModel<ADMIN>>("admins", AdminSchema);
export default AdminModel;
