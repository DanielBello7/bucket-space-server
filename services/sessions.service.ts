import SESSIONS from '@/interfaces/session.interface';
import SessionModel from "@/models/session.model";
import APIError from '@/modules/api-error';

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

  findSession = async (email: string): Promise<SESSIONS> => {
    const session = await SessionModel.findOne({ email });
    if (session) return session;
    throw new APIError(404, 'session unavailable');
  }
}

export default SessionService;
