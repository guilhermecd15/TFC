import { NextFunction, Request, Response } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const regex = /\S+@\S+.\S\.+com/;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (typeof email !== 'string' || typeof password !== 'string') {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (password.length < 6) {
      return res.status(401).json({ message: 'Password must have at least 6 characters' });
    }

    if (!regex.test(email)) return res.status(401).json({ message: 'Incorrect email or password' });

    next();
  } catch (e) {
    next(e);
  }
};
