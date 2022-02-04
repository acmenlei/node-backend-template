const { sequelize } = require("../connect/mysql");
const { Model, DataTypes } = require("sequelize");

class Category extends Model {}

Category.init({
    ll_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
    },
    ll_category_name: {
        type: DataTypes.STRING
    },
    ll_category_val: {
        type: DataTypes.STRING
    },
    ll_createdTime: {
        type: DataTypes.DATE
    },
    ll_updatedTime: {
        type: DataTypes.DATE
    }
}, {
    tableName: "ll_categorys",
    sequelize,
});

module.exports = Category;