import { check } from 'express-validator';
import ThemeController from '@/controllers/themes.controller';
import express from 'express';
import bodyValidate from '@/middlewares/body-validate';

const router = express.Router();

export default () => {
  const themes = new ThemeController();

  router.get('/', themes.getThemes);
  router.get('/:themeId', themes.findTheme);

  router.post('/',
    [
      check('title').exists().isString(),
      check('brief').exists().isString(),
      check('synonyms').exists().isArray(),
      check('before').exists().isArray(),
      check('after').exists().isArray(),
    ],
    bodyValidate,
    themes.createTheme);

  router.delete('/:themeId', themes.deleteTheme);

  return router;
}
