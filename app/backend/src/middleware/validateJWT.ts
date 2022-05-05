import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs/promises';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    const secret = await fs.readFile('jwt.evaluation.key', 'utf-8');

    if (typeof authorization !== 'string') {
      return res.status(404).end();
    }

    const decoded = jwt.verify(authorization, secret);

    if (!decoded) return res.status(404).end();

    next();
  } catch (e) {
    next(e);
  }
};
