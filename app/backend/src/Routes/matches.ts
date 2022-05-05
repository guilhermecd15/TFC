import { Router } from 'express';
import validateJWT from '../middleware/validateJWT';
import MatchesController from '../controller/matches';

const matches = Router();

const matchesController = new MatchesController();

matches.get('/', async (req, res, next) => matchesController.getAll(req, res, next));
matches.post('/', validateJWT, async (req, res, next) => matchesController.create(req, res, next));
matches.patch('/:id/finish', async (req, res, next) => matchesController.finish(req, res, next));
matches.patch('/:id', async (req, res, next) => matchesController.update(req, res, next));

export default matches;
