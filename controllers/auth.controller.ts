import { _NextFunction, _Request, _Response } from "@/global";
import { variables } from "@/constants";
import AdminService from "@/services/admins.service";
import ConsumerService from "@/services/consumers.service";
import SessionService from "@/services/sessions.service";
import generateToken from "@/modules/generate-token";

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
      const email = req.body.email;
      await this.sessionService.deleteSession(email);
      res.json({ status: "OK", msg: "success", payload: null });
    } catch (error) { next(error) }
  }

  refreshLoginCallback = async (req: _Request, res: _Response, next: _NextFunction) => {
    const { JWT_GENERAL_SECRET, EXPIRES_IN } = variables;
    try {
      const user = req.user;
      const key = generateToken(user, JWT_GENERAL_SECRET, EXPIRES_IN);
      res.json({ status: "OK", msg: "success", payload: { key, user } });
    } catch (error) { next(error) }
  }
}

export default AuthController;
