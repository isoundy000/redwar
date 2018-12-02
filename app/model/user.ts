import { Application } from 'egg';
import { DATE, DECIMAL, INTEGER, STRING } from 'sequelize';
import Sequelize = require('sequelize');
import { RechargeInstance } from './recharge';
import { RelationAttributes, RelationInstance } from './relation';
import { WithdrawInstance } from './withdraw';

export enum UserStatus {
  Normal = 0,
  Block = 1
}

export interface UserAttributes {
  id?: number;
  uid?: number;
  share?: string;
  status?: number;
  account?: string;
  password?: string;
  name?: string;
  headimgurl?: string;
  award?: number;
  token?: string;
  accessed?: string | Date | null;
  updated?: string | Date | null;
  created?: string | Date | null;
  deleted?: string | Date | null;
  relation?: RelationAttributes
}

export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes{
  id: number;
  uid: number;
  share: string;
  status: number;
  account: string;
  password: string;
  name: string;
  headimgurl: string;
  award: number;
  token: string;
  accessed: string | Date | null;
  updated: string | Date | null;
  created: string | Date | null;
  deleted: string | Date | null;
  relation?: RelationInstance;

  getWithdraws: Sequelize.HasManyGetAssociationsMixin<WithdrawInstance>
  addWithdraw: Sequelize.HasManyAddAssociationsMixin<WithdrawInstance, 'id'>
  getRecharges: Sequelize.HasManyGetAssociationsMixin<RechargeInstance>
  addRecharge: Sequelize.HasManyAddAssociationsMixin<RechargeInstance, 'id'>
  //getRole: Sequelize.HasOneGetAssociationMixin<RoleInstance>;
  //setRole: Sequelize.BelongsToSetAssociationMixin<RoleInstance, RoleId>;
  //createRole: Sequelize.BelongsToCreateAssociationMixin<RoleAttributes>;
  //removeRole: Sequelize.HasManyRemoveAssociationMixin<RoleInstance, RoleId>;
}

interface UserModel extends Sequelize.Model<UserInstance, UserAttributes>{}

export default (app: Application) => {

  const model = app.model.define<UserInstance, UserAttributes>(
    'user',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      uid: { type: INTEGER, allowNull: true, defaultValue: null, unique: true },
      share: {
        type: STRING(20),
        allowNull: true,
        defaultValue: null,
        unique: true
      },
      status: { type: INTEGER, allowNull: true, defaultValue: 0 },
      account: {
        type: STRING(128),
        allowNull: false,
        defaultValue: '',
        unique: true
      },
      password: { type: STRING(255), allowNull: false, defaultValue: '' },
      name: { type: STRING(255), allowNull: false, defaultValue: '' },
      headimgurl: { type: STRING(255), allowNull: false, defaultValue: '' },
      award: { type: DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
      token: { type: STRING(255), allowNull: true, defaultValue: '' },
      accessed: { type: DATE, allowNull: true },
      updated: { type: DATE, allowNull: true },
      created: { type: DATE, allowNull: true },
      deleted: { type: DATE, allowNull: true }
    },
    {
      tableName: app.config.prefix + 'user'
    }
  ) as UserModel;

  model.associate = () => {
    app.model.User.hasOne(app.model.Relation, { constraints: false });
    app.model.User.hasMany(app.model.Recharge, { constraints: false });
    app.model.User.hasMany(app.model.Withdraw, { constraints: false });
    app.model.User.hasMany(app.model.Relation, { constraints: false });
    app.model.User.hasMany(app.model.Packet, { constraints: false });
    app.model.User.hasMany(app.model.History, { constraints: false });
  };

  model.sync({
    force: app.config.env === 'unittest'
  });

  return model;
};
