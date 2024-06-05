import { ServiceResponse } from '../Interfaces/ServiceResponse';
import ITeam from '../Interfaces/teams/ITeam';
import ITeamModel from '../Interfaces/teams/ITeamModel';
import TeamModel from '../models/team.model';

export default class TeamService {
  constructor(private teamModel: ITeamModel = new TeamModel()) {}

  async findAll(): Promise<ServiceResponse<ITeam[]>> {
    const teams = await this.teamModel.findAll();

    return { status: 200, data: teams };
  }

  async findById(id: number): Promise<ServiceResponse<ITeam>> {
    const team = await this.teamModel.findById(id);

    if (!team) {
      return {
        status: 404,
        data: { message: 'Team not found' },
      };
    }

    return { status: 200, data: team };
  }
}
