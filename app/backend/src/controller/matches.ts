import { NextFunction, Request, Response } from 'express';
import TeamService from '../service/teams';
import MatchesService from '../service/matches';

export default class MatchesController {
  private matchesService: MatchesService;

  private teamService: TeamService;

  constructor() {
    this.matchesService = new MatchesService();
    this.teamService = new TeamService();
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const matches = await this.matchesService.getAll();

      res.status(200).json(matches);
    } catch (e) {
      next(e);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { homeTeam, awayTeam } = req.body;

      if (homeTeam === awayTeam) {
        return res.status(401)
          .json({ message: 'It is not possible to create a match with two equal teams' });
      }

      const home = await this.teamService.findById(Number(homeTeam));
      const away = await this.teamService.findById(Number(awayTeam));

      if (!home || !away) {
        return res.status(404).json({ message: 'There is no team with such id!' });
      }

      const matche = await this.matchesService.create(req.body);

      res.status(201).json(matche);
    } catch (e) {
      next(e);
    }
  };

  finish = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const match = await this.matchesService.finish(Number(id));

      res.status(200).json(match);
    } catch (e) {
      next(e);
    }
  };
}
