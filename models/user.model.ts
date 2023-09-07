import { variables } from "@/constants";
import USER from "@/interfaces/user.interface";
import bcrypt from 'bcrypt';
import paginate from 'mongoose-paginate-v2';
import mongoose from "mongoose";
import ensureError from "@/modules/ensure-error";

const UserSchema = new mongoose.Schema<USER>({
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  }
}, { timestamps: true });

UserSchema.pre("save", async function (next) {
  const salt = parseInt(variables.SALT);
  try {
    const user: USER = this;
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    return next();
  } catch (error) {
    const err = ensureError(error);
    next(err);
  }
});

UserSchema.plugin(paginate);
const UserModel = mongoose.model<USER, mongoose.PaginateModel<USER>>("users", UserSchema);
export default UserModel;
