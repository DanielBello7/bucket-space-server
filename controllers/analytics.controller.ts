import { _NextFunction, _Request, _Response } from "@/global";
import AnalyticService from "@/services/analytics.service";

class AnalyticsController {
  private analyticService: AnalyticService;

  constructor() {
    this.analyticService = new AnalyticService();
  }

  getBaseAnalytics = async (req: _Request, res: _Response, next: _NextFunction) => {
    try {
      const consumerCount = await this.analyticService.getCreatedPostCount();
      const postCount = await this.analyticService.getCreatedPostCount();
      const popularThemes = await this.analyticService.getPopularThemes();
      const popularConsumer = await this.analyticService.getPopularConsumer();

      const payload = {
        consumerCount,
        postCount,
        popularThemes,
        popularConsumer
      }

      res.json({ status: "OK", msg: "success", payload });
    } catch (error) { next(error) }
  }

  getUsersRegistrationAnalytics = async (req: _Request, res: _Response, next: _NextFunction) => {
    try {
      const response = await this.analyticService.getUserRegistrationPeriods();
      res.json({ status: "OK", msg: "success", payload: response });
    } catch (error) { next(error) }
  }
}

export default AnalyticsController;
