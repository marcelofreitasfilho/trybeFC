import ILeaderBoard from '../Interfaces/ILeaderboard';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import LeaderBoardModel from '../models/leaderboard.model';

export default class LeaderBoardService {
  constructor(
    private leaderBoardModel: LeaderBoardModel = new LeaderBoardModel(),
  ) { }

  public async leaderBoardsHome(home: boolean): Promise<ServiceResponse<ILeaderBoard[]>> {
    console.log(`LeaderBoardService: leaderBoardsHome (${home ? 'home' : 'away'})`);
    const leaderBoards = await this.leaderBoardModel.leaderBoardsHome(home);
    return { status: 200, data: leaderBoards };
  }

  public async leaderBoardAll(): Promise<ServiceResponse<ILeaderBoard[]>> {
    console.log('LeaderBoardService: leaderBoardAll');
    const homeAndAwayTeams = await this.leaderBoardModel.leaderBoardAll();
    return { status: 200, data: homeAndAwayTeams };
  }
}
