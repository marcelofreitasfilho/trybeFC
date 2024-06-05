import { Router } from 'express';
import router from './teams.route';
import loginRouter from './login.routes';
import matchRouter from './match.route';
import leaderboardRouter from './leaderboard.route';

const route = Router();

route.use('/teams', router);
route.use('/login', loginRouter);
route.use('/matches', matchRouter);
route.use('/leaderboard', leaderboardRouter);

export default route;
