import { DataTypes, InferAttributes, InferCreationAttributes, Model, CreationOptional }
  from 'sequelize';
import db from '.';
import TeamModelSequelize from './TeamModelSequelize';

class MatchModelSequelize extends Model<InferAttributes<MatchModelSequelize>,
InferCreationAttributes<MatchModelSequelize>> {
  declare id: CreationOptional<number>;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

MatchModelSequelize.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    homeTeamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    homeTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    awayTeamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    awayTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    inProgress: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },

  },
  {
    sequelize: db,
    tableName: 'matches',
    timestamps: false,
    underscored: true,
  },
);

MatchModelSequelize.hasMany(TeamModelSequelize, { foreignKey: 'id', as: 'homeTeam' });
MatchModelSequelize.hasMany(TeamModelSequelize, { foreignKey: 'id', as: 'awayTeam' });
TeamModelSequelize.belongsTo(MatchModelSequelize, { foreignKey: 'id', as: 'homeTeam' });
TeamModelSequelize.belongsTo(MatchModelSequelize, { foreignKey: 'id', as: 'awayTeam' });

export default MatchModelSequelize;
