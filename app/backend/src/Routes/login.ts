import { Router } from 'express';
import auth from '../middleware/auth';
import LoginController from '../controller/login';
import validate from '../middleware/validate';

const login = Router();

const loginController = new LoginController();

login.post('/', auth, async (req, res, next) => loginController.login(req, res, next));
login.get('/validate', validate, async (req, res, next) => loginController.validate(req, res, next));

export default login;