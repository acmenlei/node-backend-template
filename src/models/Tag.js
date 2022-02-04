const { sequelize } = require("../connect/mysql");
const { Model, DataTypes } = require("sequelize");

class Tag extends Model {}

Tag.init({
    ll_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
    },
    ll_tag_name: {
        type: DataTypes.STRING
    },
    ll_tag_val: {
        type: DataTypes.STRING
    },
    ll_createdTime: {
        type: DataTypes.DATE
    },
    ll_updatedTime: {
        type: DataTypes.DATE
    }
}, {
    tableName: "ll_tags",
    sequelize,
});

module.exports = Tag;