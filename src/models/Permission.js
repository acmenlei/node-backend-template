const { sequelize } = require("../connect/mysql");
const { Model, DataTypes } = require("sequelize");

class Permission extends Model {}

Permission.init({
    ll_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ll_permission_name: {
        type: DataTypes.STRING,
    },
    ll_permission_val: {
        type: DataTypes.STRING,
    },
    ll_level: {
        type: DataTypes.INTEGER,
    },
    ll_pid: {
        type: DataTypes.INTEGER,
    }
}, {
    tableName: "ll_permissions",
    sequelize,
});

module.exports = Permission;