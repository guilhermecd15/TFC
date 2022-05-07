import { Router } from 'express';
import leaderboard from './leaderboard';
import login from './login';
import matches from './matches';
import teams from './teams';

const routes = Router();

routes.use('/login', login);
routes.use('/teams', teams);
routes.use('/matches', matches);
routes.use('/leaderboard', leaderboard);

export default routes;
