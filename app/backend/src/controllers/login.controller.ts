import { Request, Response } from 'express';
import LoginService from '../services/login.service';

export default class LoginController {
  constructor(private loginService = new LoginService()) {}

  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const { status, data } = await this.loginService.login(email, password);
    return res.status(status).json(data);
  }

  async getUserRole(req: Request, res: Response): Promise<Response> {
    const { userId } = req.params;
    const { status, data } = await this.loginService.getUserRole(Number(userId));
    return res.status(status).json(data);
  }
}
