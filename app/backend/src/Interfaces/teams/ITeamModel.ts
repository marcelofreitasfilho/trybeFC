import ITeam from './ITeam';

interface ITeamModel {
  findAll(): Promise<ITeam[] | []>;
  findById(id: number): Promise<ITeam | null>;
}

export default ITeamModel;
