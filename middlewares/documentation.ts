import swaggerUi from 'swagger-ui-express';
import express from 'express';
import logger from '@/config/logger.config';
import yaml from 'yaml';
import { variables, docs } from '@/constants';

const router = express.Router();
const port = variables.PORT;

const swagger_document = yaml.parse(docs.swaggerFile);

function documentation() {
  router.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swagger_document));

  router.get('/api/v1/docs.json', (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swagger_document);
  });

  logger.info(`VERSION 1 DOCS AVAILABLE AT http://localhost:${port}/api/v1/docs`);
  return router;
}

export default documentation;
