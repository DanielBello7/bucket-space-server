import CONSUMER from "@/interfaces/consumer.interface";
import mongoose from "mongoose";
import paginate from 'mongoose-paginate-v2';

const ConsumerSchema = new mongoose.Schema<CONSUMER>({
  userId: {
    type: String,
    ref: "users",
    required: true
  },
  avatar: {
    type: String || null,
    ref: "uploads",
    default: null
  },
  bio: {
    type: String || null,
    default: null
  }
}, { timestamps: true });

ConsumerSchema.plugin(paginate);
const ConsumerModel = mongoose.model<CONSUMER, mongoose.PaginateModel<CONSUMER>>("consumers", ConsumerSchema);
export default ConsumerModel;
