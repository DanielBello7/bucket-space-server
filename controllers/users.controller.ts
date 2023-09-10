import { _Request, _Response, _NextFunction } from "@/global";
import UserService from "@/services/users.service";

class UsersController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  updateUserPassword = async (req: _Request, res: _Response, next: _NextFunction) => {
    try {
      const userId = req.params.userId;
      const data = {
        oldPassword: req.body.oldPassword,
        newPassword: req.body.newPassword
      }
      await this.userService.changeUserPassword(userId, data);
      res.json({ status: 'OK', msg: "password changed", payload: null });
    } catch (error) { next(error) }
  }
}

export default UsersController;
