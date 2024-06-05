import TeamModelSequelize from '../database/models/TeamModelSequelize';
import MatchModel from '../models/match.model';
import IMatches from '../Interfaces/IMatches';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatchService {
  constructor(private matchModel: MatchModel = new MatchModel()) {}

  async findAll(): Promise<ServiceResponse<IMatches[]>> {
    const matches = await this.matchModel.findAll();
    return { status: 200, data: matches };
  }

  async filterByProgress(inProgress: boolean): Promise<ServiceResponse<IMatches[]>> {
    const matches = await this.matchModel.findAll();
    const matchesInProgress = matches.filter((match) => match.inProgress === inProgress);
    return { status: 200, data: matchesInProgress };
  }

  async endMatch(id: number): Promise<ServiceResponse<IMatches | { message: string }>> {
    const match = await this.matchModel.endMatch(id);

    if (match === 'not found') {
      return { status: 404, data: { message: 'Match not found' } };
    }

    if (match === 'match has already ended') {
      return { status: 400, data: { message: 'Math already finished' } };
    }

    return { status: 200, data: { message: 'Finished' } };
  }

  async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number):
  Promise<ServiceResponse<IMatches | { message: string }>> {
    const match = await this.matchModel.updateMatch(id, homeTeamGoals, awayTeamGoals);

    if (match === 'not found') {
      return { status: 404, data: { message: 'Match not found' } };
    }

    if (match === 'finished') {
      return { status: 400, data: { message: 'Match already finished' } };
    }

    return { status: 200, data: { message: 'Updated' } };
  }

  async createMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<ServiceResponse<IMatches>> {
    const teams = await TeamModelSequelize.findAll();
    const homeTeam = teams.find((team) => team.id === homeTeamId);
    const awayTeam = teams.find((team) => team.id === awayTeamId);

    if (!homeTeam || !awayTeam) {
      return { status: 404, data: { message: 'There is no team with such id!' } };
    }

    const match = await this.matchModel.createMatch(
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
    );

    return { status: 201, data: match };
  }
}
