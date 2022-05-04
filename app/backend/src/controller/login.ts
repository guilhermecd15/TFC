import { NextFunction, Request, Response } from "express";
import AuthService from "../service/auth";

export default class LoginController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService;
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const userFind = await this.authService.findByName(email);
      if (!userFind) {
        return res.status(401).json({ message: 'could not authenticate user' });
      }

      const authUser = await this.authService.compare(password, userFind.password)
      if (!authUser) {
        return res.status(401).json({ message: 'could not authenticate user' });
      }

      const token = await this.authService.tokenGenerator(userFind.username, userFind.email, userFind.role);
      const user = { id: userFind.id, username: userFind.username, email: userFind.email, role: userFind.role }

      res.status(200).json({ user, token });
    } catch (e) {
      next(e);
    }
  }

  validate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { decoded } = req.body;

      res.status(200).json(decoded.role);
    } catch (e) {
      next(e);
    }
  }
}