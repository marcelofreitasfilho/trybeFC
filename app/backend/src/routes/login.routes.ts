import { Request, Response, Router } from 'express';
import LoginController from '../controllers/login.controller';
import auth from '../middlewares/auth';

const loginRouter = Router();

const loginController = new LoginController();

loginRouter.post('/', (req: Request, res: Response) => loginController.login(req, res));
loginRouter.get('/role', auth, (req: Request, res: Response) =>
  loginController.getUserRole(req, res));

export default loginRouter;
