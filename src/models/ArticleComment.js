const { sequelize } = require("../connect/mysql");
const { Model, DataTypes } = require("sequelize");

class ArticleComment extends Model { }

ArticleComment.init({
  ll_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: false
  },
  ll_article_id: {
    type: DataTypes.INTEGER
  },
  ll_username: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  ll_content: {
    type: DataTypes.STRING,
  },
  ll_nick_name: {
    type: DataTypes.STRING,
  },
  ll_createdTime: {
    type: DataTypes.DATE,
  },
  ll_avatar: {
    type: DataTypes.STRING
  },
  ll_level: {
    type: DataTypes.INTEGER
  }
},
  {
    tableName: "ll_article_comments",
    sequelize,
  })

module.exports = ArticleComment