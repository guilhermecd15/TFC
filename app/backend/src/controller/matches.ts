import { NextFunction, Request, Response } from "express";
import MatchesService from "../service/matches";

export default class MatchesController {
  private matchesService: MatchesService;

  constructor() {
    this.matchesService = new MatchesService;
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const matches = await this.matchesService.getAll()

      res.status(200).json(matches);
    } catch (e) {
      next(e);
    }
  }
}