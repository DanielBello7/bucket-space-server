import SessionModel from "@/models/session.model";

class SessionService {
  constructor() { }

  createSession = async (token: string, email: string) => {
    const check = await SessionModel.find({ email: email });
    if (check.length > 0) await SessionModel.deleteMany({ email: email });
    await new SessionModel({ email, token }).save();
    return;
  }

  deleteSession = async (email: string) => {
    await SessionModel.deleteMany({ email });
    return
  }
}

export default SessionService;
