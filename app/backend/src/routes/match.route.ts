import { Router, Request, Response } from 'express';
import MatchController from '../controllers/match.controller';
import auth from '../middlewares/auth';
import validateNewMatch from '../middlewares/validateNewMatch';

const matchController = new MatchController();

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const { inProgress } = req.query;
  if (inProgress === undefined) {
    matchController.findAll(req, res);
  } else {
    matchController.filterByProgress(req, res);
  }
});
router.patch('/:id/finish', auth, (req: Request, res: Response) =>
  matchController.endMatch(req, res));
router.patch('/:id', auth, (req: Request, res: Response) => matchController.updateMatch(req, res));
router.post('/', auth, validateNewMatch, (req: Request, res: Response) =>
  matchController.createMatch(req, res));

export default router;
