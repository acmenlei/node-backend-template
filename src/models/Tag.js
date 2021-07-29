const { sequelize } = require("../connect/mysql");
const { Model, DataTypes } = require("sequelize");

class Tag extends Model {}

Tag.init(
  {
    ll_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
    },
    ll_tag_name: {
        type: DataTypes.STRING
    }
  },
  {
    tableName: "ll_tags",
    sequelize,
  }
);

module.exports = Tag;
