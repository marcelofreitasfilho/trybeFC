import IMatches from './IMatches';

interface IMatchModel {
  findAll(): Promise<IMatches[]>;
}

export default IMatchModel;
