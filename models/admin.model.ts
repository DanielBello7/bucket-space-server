import ADMIN from '@/interfaces/admin.interface';
import mongoose from "mongoose";
import paginate from 'mongoose-paginate-v2';

const AdminSchema = new mongoose.Schema<ADMIN>({}, { timestamps: true });

AdminSchema.plugin(paginate);
const AdminModel = mongoose.model<ADMIN, mongoose.PaginateModel<ADMIN>>("admins", AdminSchema);
export default AdminModel;
