import IMatches from '../Interfaces/IMatches';
import IMatchModel from '../Interfaces/IMatchModel';
import IMatchesTeams from '../Interfaces/IMatchesTeams';
import MatchModelSequelize from '../database/models/MatchModelSequelize';
import TeamModelSequelize from '../database/models/TeamModelSequelize';

export default class MatchModel implements IMatchModel {
  private model = MatchModelSequelize;
  async findAll(): Promise<IMatchesTeams[]> {
    const teams = await TeamModelSequelize.findAll();
    const data = await this.model.findAll();

    const matches = data.map((match) => ({
      id: match.id,
      homeTeamId: match.homeTeamId,
      homeTeamGoals: match.homeTeamGoals,
      awayTeamId: match.awayTeamId,
      awayTeamGoals: match.awayTeamGoals,
      inProgress: match.inProgress,
      homeTeam: {
        teamName: teams.find((team) => team.id === match.homeTeamId)?.teamName,
      },
      awayTeam: {
        teamName: teams.find((team) => team.id === match.awayTeamId)?.teamName,
      },
    }));
    return matches;
  }

  async endMatch(id: number): Promise<void | string> {
    const match = await this.model.findByPk(id);
    if (!match) {
      return 'not found';
    }
    if (match.inProgress === false) {
      return 'match has already ended';
    }
    match.inProgress = false;
    await match.save();
  }

  async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number):
  Promise<void | string> {
    const match = await this.model.findByPk(id);
    if (!match) {
      return 'not found';
    }
    if (match.inProgress === false) {
      return 'finished';
    }
    match.homeTeamGoals = homeTeamGoals;
    match.awayTeamGoals = awayTeamGoals;
    await match.save();
  }

  async createMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<IMatches> {
    const match = await this.model.create({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
    return match;
  }
}
