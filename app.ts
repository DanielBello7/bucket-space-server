import express from 'express';

export default function serverApplication() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.get('/', (req, res) => {
    return res.send('done');
  });
  return app;
}
