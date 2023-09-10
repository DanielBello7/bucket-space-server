import ADMIN from '@/interfaces/admin.interface';
import AdminModel from "@/models/admin.model";
import APIError from '@/modules/api-error';

class AdminService {
  constructor() { }

  findAdmin = async (adminId: string): Promise<ADMIN> => {
    const check = await AdminModel.findOne({ _id: adminId }).populate("userId");
    if (check) return check
    throw new APIError(404, 'user not registered');
  }
}

export default AdminService;
