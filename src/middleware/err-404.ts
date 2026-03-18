import { Request, Response } from 'express';

export default (req: Request, res: Response): void => {
  res.render('errors/err-404', {
    title: '404'
  });
};
