import { Request, Router, Response } from 'express';
import LeaderBoardController from '../controllers/leaderboard.controller';

const leaderBoardController = new LeaderBoardController();

const router = Router();

router.get('/', (req: Request, res: Response) => leaderBoardController.leaderBoardAll(req, res));

router.get('/home', (req: Request, res: Response) =>
  leaderBoardController.leaderBoardHome(req, res));

router.get('/away', (req: Request, res: Response) =>
  leaderBoardController.leaderBoardAway(req, res));

export default router;
