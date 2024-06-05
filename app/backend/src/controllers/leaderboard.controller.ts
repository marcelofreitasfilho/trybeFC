import { Request, Response } from 'express';
import LeaderBoardService from '../services/leaderboard.service';

export default class LeaderBoardController {
  constructor(
    private leaderBoardService = new LeaderBoardService(),
  ) { }

  public async leaderBoardAll(_req: Request, res: Response) {
    console.log('LeaderBoardController: leaderBoardAll');
    const response = await this.leaderBoardService.leaderBoardAll();
    return res.status(response.status).json(response.data);
  }

  public async leaderBoardHome(_req: Request, res: Response) {
    console.log('LeaderBoardController: leaderBoardHome');
    const response = await this.leaderBoardService.leaderBoardsHome(true);
    return res.status(response.status).json(response.data);
  }

  public async leaderBoardAway(_req: Request, res: Response) {
    console.log('LeaderBoardController: leaderBoardAway');
    const response = await this.leaderBoardService.leaderBoardsHome(false);
    return res.status(response.status).json(response.data);
  }
}
