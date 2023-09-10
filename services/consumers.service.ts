import { PaginateResult, PaginateOptions } from "mongoose";
import CONSUMER from '@/interfaces/consumer.interface';
import USER from '@/interfaces/user.interface';
import UserModel from "@/models/user.model";
import APIError from "@/modules/api-error";
import ConsumerModel from "@/models/consumer.model";

class ConsumerService {
  constructor() { }

  createConsumer = async (data: Partial<CONSUMER & USER>): Promise<CONSUMER> => {
    const check = await UserModel.findOne({ email: data.email });
    if (!check) throw new APIError(400, 'email already registered');
    const user = await new UserModel({ ...data }).save();
    const consumer = await new ConsumerModel({ userId: user._id, ...data }).save();
    const res = await ConsumerModel.findOne({ _id: consumer._id }).populate("userId");
    if (res) return res;
    throw new APIError(500, 'error creating cosumer account');
  }

  getConsumers = async (): Promise<PaginateResult<CONSUMER>> => {
    const options: PaginateOptions = { populate: "userId" }
    const res = await ConsumerModel.paginate({}, options);
    return res;
  }

  findConsumer = async (id: string): Promise<CONSUMER> => {
    const check = await ConsumerModel.findOne({ _id: id }).populate("userId");
    if (check) return check;
    throw new APIError(404, 'user not registered');
  }

  updateConsumer = async (consumerId: string, data: Partial<CONSUMER & USER>): Promise<CONSUMER> => {
    const confirm = await ConsumerModel.findOne({ _id: consumerId });
    if (!confirm) throw new APIError(404, 'user not registered');
    await ConsumerModel.updateOne({ _id: consumerId }, { $set: { ...data } });
    await UserModel.updateOne({ _id: confirm.userId }, { $set: { ...data } });
    const res = await ConsumerModel.findOne({ _id: consumerId }).populate("userId");
    if (res) return res;
    throw new APIError(500, 'error updating user information');
  }
}

export default ConsumerService;
