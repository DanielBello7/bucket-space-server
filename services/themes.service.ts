import THEMES from '@/interfaces/theme.interface';
import ThemeModel from "@/models/theme.model";
import APIError from '@/modules/api-error';

class ThemeService {
  constructor() { }

  getThemes = async (): Promise<THEMES[]> => {
    const res = await ThemeModel.find();
    return res;
  }

  findTheme = async (themeId: string): Promise<THEMES> => {
    const theme = await ThemeModel.findOne({ _id: themeId });
    if (theme) return theme;
    throw new APIError(404, 'theme unavailable');
  }

  createTheme = async (data: Partial<THEMES>): Promise<THEMES> => {
    const checkTheme = await ThemeModel.findOne({ title: data.title });
    if (checkTheme) return checkTheme;
    const newTheme = await new ThemeModel({ ...data }).save();
    return newTheme;
  }

  deleteTheme = async (themeId: string) => {
    await ThemeModel.deleteOne({ _id: themeId });
    return;
  }
}

export default ThemeService;
