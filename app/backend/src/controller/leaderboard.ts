import { NextFunction, Request, Response } from 'express';
import LeaderboardService, { createBoardAway,
  createBoardHome, createLeaderboard } from '../service/leaderboard';

export default class LeaderboardController {
  private leaderboard: LeaderboardService;

  constructor() {
    this.leaderboard = new LeaderboardService();
  }

  getHome = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const teams = await this.leaderboard.getHome();

      const board = await createBoardHome(teams);

      board.sort((a, b) => b.totalPoints - a.totalPoints
        || b.goalsBalance - a.goalsBalance || b.goalsFavor - a.goalsFavor);

      res.status(200).json(board);
    } catch (e) {
      next(e);
    }
  };

  getAway = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const teams = await this.leaderboard.getAway();

      const board = await createBoardAway(teams);

      board.sort((a, b) => b.totalPoints - a.totalPoints
        || b.goalsBalance - a.goalsBalance || b.goalsFavor - a.goalsFavor);

      res.status(200).json(board);
    } catch (e) {
      next(e);
    }
  };

  get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const teamsHome = await this.leaderboard.getHome();
      const teamsAway = await this.leaderboard.getAway();

      const boardHome = await createBoardHome(teamsHome);
      const boardAway = await createBoardAway(teamsAway);

      const board = await createLeaderboard(boardHome, boardAway);

      board.sort((a, b) => b.totalPoints - a.totalPoints
        || b.goalsBalance - a.goalsBalance || b.goalsFavor - a.goalsFavor);

      res.status(200).json(board);
    } catch (e) {
      next(e);
    }
  };
}
