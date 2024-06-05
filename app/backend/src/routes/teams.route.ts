import { Router, Response, Request } from 'express';
import TeamController from '../controllers/team.controller';

const router = Router();

const controller = new TeamController();

router.get('/', (req: Request, res: Response) => controller.findAll(req, res));
router.get('/:id', (req: Request, res: Response) => controller.findById(req, res));

export default router;
