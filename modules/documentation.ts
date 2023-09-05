import swaggerUi from 'swagger-ui-express';
import express from 'express';
import logger from '@/config/logger.config';
import yaml from 'yaml';
import path from 'path';
import fs from 'fs';
import { variables } from '@/constants';

const router = express.Router();
const port = variables.PORT;

const swagger_file = fs.readFileSync(path.join(__dirname, '/docs.yml'), 'utf8');
const swagger_document = yaml.parse(swagger_file);

function documentation() {
  router.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swagger_document));

  router.get('/api/v1/docs.json', (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swagger_document);
  });

  logger.info(`version docs are available at http://localhost:${port}/api/v1/docs`);
  return router;
}

export default documentation;
