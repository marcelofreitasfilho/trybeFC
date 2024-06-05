import IUser from '../Interfaces/IUser';
import { IUserModel } from '../Interfaces/IUserModel';
import UserModelSequelize from '../database/models/UserModelSequelize';

export default class UserModel implements IUserModel {
  private model = UserModelSequelize;

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    return user;
  }

  async findById(id: number): Promise<IUser | null> {
    const user = await this.model.findByPk(id);
    return user;
  }
}
