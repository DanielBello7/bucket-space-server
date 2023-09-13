import express from 'express';
import AnalyticsController from '@/controllers/analytics.controller';
const router = express.Router();

export default () => {
  const analytics = new AnalyticsController();
  router.get('/', analytics.getBaseAnalytics);
  router.get('/users/', analytics.getUsersRegistrationAnalytics);
  return router;
}
