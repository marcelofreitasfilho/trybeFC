import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional }
  from 'sequelize';
import db from '.';

class UserModelSequelize extends Model<InferAttributes<UserModelSequelize>,
InferCreationAttributes<UserModelSequelize>> {
  declare id: CreationOptional<number>;
  declare username: string;
  declare password: string;
  declare email: string;
  declare role: string;
}

UserModelSequelize.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  tableName: 'users',
  timestamps: false,
  underscored: true,
});

export default UserModelSequelize;
