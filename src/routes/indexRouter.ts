import express from 'express';
const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
  res.render('index', {
    title: 'Главная',
  });
});

export default router;
