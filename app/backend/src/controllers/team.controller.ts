import { Request, Response } from 'express';
import TeamService from '../services/team.service';

export default class TeamController {
  constructor(private teamService: TeamService = new TeamService()) {}

  async findAll(req: Request, res: Response): Promise<Response> {
    const response = await this.teamService.findAll();

    return res.status(response.status).json(response.data);
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const response = await this.teamService.findById(Number(id));

    return res.status(response.status).json(response.data);
  }
}
