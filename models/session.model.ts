import SESSIONS from '@/interfaces/session.interface';
import mongoose from "mongoose";
import paginate from 'mongoose-paginate-v2';

const SessionSchema = new mongoose.Schema<SESSIONS>({
  token: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
}, { timestamps: true });

SessionSchema.set("toJSON", {
  transform(_doc, ret) {
    delete ret.__v;
  },
});

SessionSchema.plugin(paginate);
const SessionModel = mongoose.model<SESSIONS, mongoose.PaginateModel<SESSIONS>>("sessions", SessionSchema);
export default SessionModel;
