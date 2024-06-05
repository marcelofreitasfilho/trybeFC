import { Request, Response } from 'express';
import MatchService from '../services/match.service';
import updateMatchSchema from '../utils/updateMatchSchema';

export default class MatchController {
  constructor(private matchService = new MatchService()) {}

  async findAll(req: Request, res: Response) {
    const response = await this.matchService.findAll();
    res.status(response.status).json(response.data);
  }

  async filterByProgress(req: Request, res: Response) {
    const { inProgress } = req.query;
    const response = await this.matchService.filterByProgress(inProgress === 'true');
    res.status(response.status).json(response.data);
  }

  async endMatch(req: Request, res: Response) {
    const { id } = req.params;
    const response = await this.matchService.endMatch(Number(id));
    res.status(response.status).json(response.data);
  }

  async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { error } = updateMatchSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const response = await this.matchService.updateMatch(
      Number(id),
      homeTeamGoals,
      awayTeamGoals,
    );
    res.status(response.status).json(response.data);
  }

  async createMatch(req: Request, res: Response) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    const response = await this.matchService.createMatch(
      Number(homeTeamId),
      Number(awayTeamId),
      Number(homeTeamGoals),
      Number(awayTeamGoals),
    );
    res.status(response.status).json(response.data);
  }
}
