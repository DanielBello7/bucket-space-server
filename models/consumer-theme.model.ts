import CONSUMER_THEMES from '@/interfaces/consumer-theme.interface';
import mongoose from "mongoose";
import paginate from 'mongoose-paginate-v2';

const ConsumerThemeSchema = new mongoose.Schema<CONSUMER_THEMES>({
  consumerId: {
    type: String,
    ref: "consumers",
    required: true
  },
  themeId: {
    type: String,
    ref: "themes",
    required: true
  }
}, { timestamps: true });

ConsumerThemeSchema.set("toJSON", {
  transform(_doc, ret) {
    delete ret.__v;
  },
});

ConsumerThemeSchema.plugin(paginate);
const ConsumerThemeModel = mongoose.model<CONSUMER_THEMES, mongoose.PaginateModel<CONSUMER_THEMES>>("consumer-themes", ConsumerThemeSchema);
export default ConsumerThemeModel;
