import { _NextFunction, _Request, _Response } from "@/global";
import AdminService from "@/services/admins.service";
import USER from '@/interfaces/user.interface';
import ConsumerService from "@/services/consumers.service";
import SessionService from "@/services/sessions.service";

class AuthController {
  private adminService: AdminService;
  private consumerService: ConsumerService;
  private sessionService: SessionService;

  constructor() {
    this.adminService = new AdminService();
    this.consumerService = new ConsumerService();
    this.sessionService = new SessionService();
  }

  adminLoginCallback = async (req: _Request, res: _Response, next: _NextFunction) => {
    try {
      const { user, key, refreshToken } = req.user;
      const admin = await this.adminService.findAdmin(user._id);
      await this.sessionService.createSession(user.email, req.user)
      res.json({ status: "OK", msg: "success", payload: { admin, key, refreshToken } });
    } catch (error) { next(error) }
  }

  consumerLoginCallback = async (req: _Request, res: _Response, next: _NextFunction) => {
    try {
      const { user, key, refreshToken } = req.user;
      const consumer = await this.consumerService.findConsumer(user._id);
      await this.sessionService.createSession(user.email, req.user)
      res.json({ status: "OK", msg: "success", payload: { consumer, key, refreshToken } });
    } catch (error) { next(error) }
  }

  logoutUser = async (req: _Request, res: _Response, next: _NextFunction) => {
    try {

    } catch (error) { next(error) }
  }
}

export default AuthController;
