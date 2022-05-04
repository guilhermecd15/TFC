import { Router } from 'express';
import TeamController from '../controller/teams';

const team = Router();

const teamController = new TeamController();

team.get('/', async (req, res, next) => teamController.getAll(req, res, next));
team.get('/:id', async (req, res, next) => teamController.findById(req, res, next));

export default team;
