import { _NextFunction, _Request, _Response } from "@/global";
import EmailService from "@/services/email.service";
import UserService from "@/services/users.service";

class RecoveryController {
  private emailService: EmailService;
  private userService: UserService;

  constructor() {
    this.emailService = new EmailService();
    this.userService = new UserService();
  }

  updateUserPassword = async (req: _Request, res: _Response, next: _NextFunction) => {
    try {
      const email = req.body.email;
      const newPassword = req.body.newPassword;
      await this.userService.replaceUserPassword(email, newPassword);
      res.json({ status: "OK", msg: "success", payload: null });
    } catch (error) { next(error) }
  }

  sentOTP = async (req: _Request, res: _Response, next: _NextFunction) => {
    try {
      const email = req.body.email;
      const otp = req.body.otp;
      await this.emailService.sendOtpEmail(email, otp);
      res.json({ status: "OK", msg: "success", payload: null });
    } catch (error) { next(error) }
  }

  verifyUser = async (req: _Request, res: _Response, next: _NextFunction) => {
    try {
      const email = req.params.email;
      await this.userService.findUser(email);
      res.json({ status: "OK", msg: "user verified", payload: email });
    } catch (error) { next(error) }
  }
}

export default RecoveryController;
