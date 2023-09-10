import THEMES from '@/interfaces/theme.interface';
import mongoose from "mongoose";
import paginate from 'mongoose-paginate-v2';

const ThemeSchema = new mongoose.Schema<THEMES>({
  title: {
    type: String,
    required: true
  },
  brief: {
    type: String,
    required: true
  },
  synonyms: [{
    type: String,
    default: []
  }],
  before: [{
    type: String,
    default: []
  }],
  after: [{
    type: String,
    default: []
  }]
}, { timestamps: true });

ThemeSchema.set("toJSON", {
  transform(_doc, ret) {
    delete ret.__v;
  },
});

ThemeSchema.plugin(paginate);
const ThemeModel = mongoose.model<THEMES, mongoose.PaginateModel<THEMES>>("themes", ThemeSchema);
export default ThemeModel;
