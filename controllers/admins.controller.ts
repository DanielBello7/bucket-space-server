import { _Request, _Response, _NextFunction } from "@/global";

class AdminsController {
  constructor() { }

  findAdmin = async (req: _Request, res: _Response, next: _NextFunction) => {
    try {

    } catch (error) { next(error) }
  }
}

export default AdminsController;
