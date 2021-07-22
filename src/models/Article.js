const { sequelize } = require('../connect/mysql');
const { Model, DataTypes } = require('sequelize');

class Article extends Model {}

Article.init({
    ll_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: false },
    ll_title: { type: DataTypes.TEXT },
    ll_introduce: { type: DataTypes.TEXT },
    ll_category: { type: DataTypes.STRING },
    ll_tags: { type: DataTypes.STRING },
    ll_visitedCounts: { type: DataTypes.INTEGER },
    ll_likedCounts: { type: DataTypes.INTEGER },
    ll_cover: { type: DataTypes.STRING },
    ll_createdTime: { type: DataTypes.DATE },
    ll_updatedTime: { type: DataTypes.DATE },
}, { tableName: 'll_article', sequelize })

module.exports = Article