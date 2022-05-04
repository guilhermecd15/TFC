import { Router } from 'express';
import MatchesController from '../controller/matches';

const matches = Router();

const matchesController = new MatchesController();

matches.get('/', async (req, res, next) => matchesController.getAll(req, res, next));

export default matches;
