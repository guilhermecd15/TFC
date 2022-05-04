import { Router } from 'express';
import login from './login';
import teams from './teams';

const routes = Router();

routes.use('/login', login);
routes.use('/teams', teams)

export default routes;