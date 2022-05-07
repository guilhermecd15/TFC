import { Router } from 'express';
import LeaderboardController from '../controller/leaderboard';

const leaderboard = Router();

const leaderboardController = new LeaderboardController();

leaderboard.get('/home', async (req, res, next) => leaderboardController.getHome(req, res, next));

export default leaderboard;
