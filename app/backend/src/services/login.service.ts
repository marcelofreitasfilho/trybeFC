import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import UserModel from '../models/user.mode';
import { IUserModel } from '../Interfaces/IUserModel';
import { ServiceResponse, loginResponse, roleResponse } from '../Interfaces/ServiceResponse';

const SECRET = process.env.JWT_SECRET || 'jwt_secret';
const validation = /^[\w]+@([\w-]+\.)+[\w-]{2,4}$/;
const invalidEorP = 'Invalid email or password';

export default class LoginService {
  constructor(private model: IUserModel = new UserModel()) {}

  async login(email: string, password: string): Promise<ServiceResponse<loginResponse>> {
    if (!email || !password) {
      return {
        status: 400, data: { message: 'All fields must be filled' } };
    }
    if (!validation.test(email) || password.length < 6) {
      return { status: 401, data: { message: invalidEorP } };
    }
    const user = await this.model.findByEmail(email);

    if (!user) {
      return { status: 401, data: { message: invalidEorP } };
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return { status: 401, data: { message: invalidEorP } };
    }

    const tkn = jwt.sign({ id: user.id }, SECRET);
    return { status: 200, data: { token: tkn } };
  }

  async getUserRole(userId: number): Promise<ServiceResponse<roleResponse>> {
    const user = await this.model.findById(userId);
    if (!user) {
      return { status: 404, data: { message: 'User not found' } };
    }
    const { role } = user;
    return { status: 200, data: { role } };
  }
}
