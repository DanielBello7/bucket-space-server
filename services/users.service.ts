import { variables } from '@/constants'
import USER from '@/interfaces/user.interface';
import UserModel from "@/models/user.model";
import bcrypt from 'bcrypt';
import APIError from "@/modules/api-error";

type PASSWORD_UPDATE_DATA = {
  oldPassword: string
  newPassword: string
}

class UserService {
  constructor() { }

  changeUserPassword = async (userId: string, data: PASSWORD_UPDATE_DATA) => {
    const check = await UserModel.findOne({ _id: userId });
    if (!check) throw new APIError(404, 'user not regisered');
    if (!bcrypt.compareSync(data.oldPassword, check.password))
      throw new APIError(400, 'invalid credentials');
    const newHash = bcrypt.hashSync(data.newPassword, parseInt(variables.SALT));
    await UserModel.updateOne({ _id: userId }, { $set: { password: newHash } });
  }

  replaceUserPassword = async (email: string, newPassword: string) => {
    const check = await UserModel.findOne({ email });
    if (!check) throw new APIError(404, 'user not regisered');
    const hashed = bcrypt.hashSync(newPassword, parseInt(variables.SALT));
    await UserModel.updateOne({ email }, { $set: { password: hashed } });
    return;
  }

  findUser = async (id: string): Promise<USER> => {
    const user = await UserModel.findOne({ $or: [{ email: id }, { _id: id }] })
    if (user) return user;
    throw new APIError(404, 'user not registered');
  }
}

export default UserService;
