const { sequelize } = require("../connect/mysql");
const { Model, DataTypes } = require("sequelize");

class User extends Model {}

User.init({
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
    ll_password: {
        type: DataTypes.TEXT,
    },
    ll_email: {
        type: DataTypes.STRING,
    },
    ll_sex: {
        type: DataTypes.CHAR,
    },
    ll_permission: {
        type: DataTypes.TEXT,
    },
    ll_createdTime: {
        type: DataTypes.DATE,
    },
    ll_updatedTime: {
        type: DataTypes.DATE,
    },
}, {
    tableName: "ll_users",
    sequelize,
});

module.exports = User;