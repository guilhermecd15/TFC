import { NextFunction, Request, Response } from 'express';
import LeaderboardService, { createBoard } from '../service/leaderboard';

export default class LeaderboardController {
  private leaderboard: LeaderboardService;

  constructor() {
    this.leaderboard = new LeaderboardService();
  }

  getHome = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const teams = await this.leaderboard.getHome();

      const board = await createBoard(teams);

      board.sort((a, b) => b.totalPoints - a.totalPoints
        || b.goalsBalance - a.goalsBalance || b.goalsFavor - a.goalsFavor);

      res.status(200).json(board);
    } catch (e) {
      next(e);
    }
  };
}
