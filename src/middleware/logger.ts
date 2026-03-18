import * as fs from 'fs';
import * as os from 'os';
import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction): void => {
  const now = Date.now();
  const { url, method } = req;

  const data = `${now} ${method} ${url}`;

  fs.appendFile('server.log', data + os.EOL, (err) => {
    if (err) {
      console.error('Ошибка при записи в лог:', err);
    }
  });

  next();
};
