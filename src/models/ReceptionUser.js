const { sequelize } = require("../connect/mysql");
const { Model, DataTypes } = require("sequelize");

class ReceptionUser extends Model {}

ReceptionUser.init({
    ll_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
    },
    ll_username: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: false,
    },
    ll_avatar: {
      type: DataTypes.STRING
    },
    ll_nick_name: {
      type: DataTypes.STRING
    },
    ll_password: {
        type: DataTypes.STRING,
    },
    ll_createdTime: {
        type: DataTypes.DATE,
    },
    ll_updatedTime: {
        type: DataTypes.DATE,
    },
}, {
    tableName: "ll_reception_users",
    sequelize,
});

module.exports = ReceptionUser;