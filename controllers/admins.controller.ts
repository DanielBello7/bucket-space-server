import { _Request, _Response, _NextFunction } from "@/global";
import AdminService from "@/services/admins.service";

class AdminsController {
  private adminService: AdminService;
  constructor() {
    this.adminService = new AdminService();
  }

  findAdmin = async (req: _Request, res: _Response, next: _NextFunction) => {
    try {
      const adminId = req.params.adminId;
      const response = await this.adminService.findAdmin(adminId);
      res.json({ status: "OK", msg: "success", payload: response })
    } catch (error) { next(error) }
  }
}

export default AdminsController;
