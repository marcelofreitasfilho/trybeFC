import ITeamModel from '../Interfaces/teams/ITeamModel';
import ITeam from '../Interfaces/teams/ITeam';
import TeamModelSequelize from '../database/models/TeamModelSequelize';

export default class TeamModel implements ITeamModel {
  private model = TeamModelSequelize;

  async findAll(): Promise<ITeam[] | []> {
    const teams = await this.model.findAll();

    return teams;
  }

  async findById(id: number): Promise<ITeam | null> {
    const team = await this.model.findByPk(id);

    return team;
  }
}
