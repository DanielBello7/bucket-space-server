import { _NextFunction, _Request, _Response } from "@/global";
import ThemeService from "@/services/themes.service";

class ThemeController {
  private themeService: ThemeService;

  constructor() {
    this.themeService = new ThemeService();
  }

  getThemes = async (req: _Request, res: _Response, next: _NextFunction) => {
    try {
      const response = await this.themeService.getThemes();
      res.json({ status: "OK", msg: "success", payload: response });
    } catch (error) { next(error) }
  }

  findTheme = async (req: _Request, res: _Response, next: _NextFunction) => {
    try {
      const themeId = req.params.themeId;
      const response = await this.themeService.findTheme(themeId);
      res.json({ status: "OK", msg: "success", payload: response });
    } catch (error) { next(error) }
  }

  createTheme = async (req: _Request, res: _Response, next: _NextFunction) => {
    try {
      const body = req.body;
      const data = {
        title: body.title,
        brief: body.brief,
        synonyms: body.synonyms,
        before: body.before,
        after: body.after
      }
      const response = await this.themeService.createTheme(data);
      res.json({ status: "OK", msg: "success", payload: response });
    } catch (error) { next(error) }
  }

  deleteTheme = async (req: _Request, res: _Response, next: _NextFunction) => {
    try {
      const themeId = req.params.themeId;
      await this.themeService.deleteTheme(themeId);
      res.json({ status: "OK", msg: "success", payload: null });
    } catch (error) { next(error) }
  }
}

export default ThemeController;
