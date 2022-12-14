import { Router } from 'express';
import LeaderboardController from '../controller/leaderboard';

const leaderboard = Router();

const leaderboardController = new LeaderboardController();

leaderboard.get('/home', async (req, res, next) => leaderboardController.getHome(req, res, next));
leaderboard.get('/away', async (req, res, next) => leaderboardController.getAway(req, res, next));
leaderboard.get('/', async (req, res, next) => leaderboardController.get(req, res, next));

export default leaderboard;
