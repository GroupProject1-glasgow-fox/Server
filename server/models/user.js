'use strict';

const { generatePass } = require('../helper/bcrypt')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Activity, {foreignKey: 'UserId'})
    }
  };
  User.init({
    email: {
      type : DataTypes.STRING,
      validate : {
        isEmail : {
          args : true,
          msg : 'Must Be Email Format'
        }, 
        notEmpty : {
          args : true,
          msg : 'Email must be filled'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate : {
        notEmpty : {
          args : true,
          msg : 'Password must be filled'
        }
      }
    }
  }, {
    hooks : {
      beforeCreate : (user, option) => {
        user.password = bcrypt.generatePass(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};