import CONSUMERS from '@/interfaces/consumer.interface';
import THEMES from '@/interfaces/theme.interface';
import ConsumerThemeModel from '@/models/consumer-theme.model';
import ConsumerModel from '@/models/consumer.model';
import ThemeModel from '@/models/theme.model';
import PostModel from '@/models/post.model';

type POPULAR_THEME = {
  theme: THEMES,
  count: number
}

class AnalyticService {
  constructor() { }

  getRegisterdConsumerCount = async (): Promise<number> => {
    const consumerCount = await ConsumerModel.find().count();
    return consumerCount;
  }

  getCreatedPostCount = async (): Promise<number> => {
    const postCount = await PostModel.find().count();
    return postCount;
  }

  getPopularThemes = async (): Promise<POPULAR_THEME[]> => {
    const themes = await ThemeModel.find();
    const res = await Promise.all(themes.map(async (item) => {
      const count = await ConsumerThemeModel.find({ themeId: item._id }).count();
      return {
        theme: item,
        count
      }
    }));
    return res
  }

  getPopularConsumer = async (): Promise<CONSUMERS> => {
    const find = await ConsumerModel.findOne().populate("userId");
    if (find) return find;
    throw new Error('error finding user');
  }

  getUserRegistrationPeriods = async (): Promise<{ month: string; count: number }[]> => {
    const months = [
      "january",
      "febuary",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december"
    ];

    const data = await Promise.all(months.map(async (month, index) => {
      const response = await ConsumerModel.find({
        $expr: {
          $eq: [{ $month: '$createdAt' }, index]
        }
      }).countDocuments();

      return {
        count: response,
        month
      }
    }));
    return data;
  }
}

export default AnalyticService;
