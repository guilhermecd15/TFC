import { Router } from 'express';
import login from './login';
import matches from './matches';
import teams from './teams';

const routes = Router();

routes.use('/login', login);
routes.use('/teams', teams);
routes.use('/matches', matches);

export default routes;
