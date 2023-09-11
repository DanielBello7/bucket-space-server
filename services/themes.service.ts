import THEMES from '@/interfaces/theme.interface';
import ThemeModel from "@/models/theme.model";

class ThemeService {
  constructor() { }

  getThemes = async (): Promise<THEMES[]> => {
    const res = await ThemeModel.find();
    return res;
  }
}

export default ThemeService;
