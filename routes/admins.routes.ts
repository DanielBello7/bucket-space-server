import express from 'express';
import AdminsController from '@/controllers/admins.controller';
const router = express.Router();

export default () => {
  const admins = new AdminsController();
  router.get('/', admins.getAdmins);
  return router;
}
