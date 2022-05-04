import { NextFunction, Request, Response } from 'express';
import TeamService from '../service/teams';

export default class TeamController {
  private teamService: TeamService;

  constructor() {
    this.teamService = new TeamService();
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const teams = await this.teamService.getAll();

      res.status(200).json(teams);
    } catch (e) {
      next(e);
    }
  };

  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const teams = await this.teamService.findById(Number(id));

      res.status(200).json(teams);
    } catch (e) {
      next(e);
    }
  };
}
