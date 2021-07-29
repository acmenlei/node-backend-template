const { sequelize } = require("../connect/mysql");
const { Model, DataTypes } = require("sequelize");

class Category extends Model {}

Category.init(
  {
    ll_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
    },
    ll_category_name: {
        type: DataTypes.STRING
    }
  },
  {
    tableName: "ll_categorys",
    sequelize,
  }
);

module.exports = Category;
