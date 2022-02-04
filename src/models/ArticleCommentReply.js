const { sequelize } = require("../connect/mysql");
const { Model, DataTypes } = require("sequelize");

class ArticleCommentReply extends Model { }

ArticleCommentReply.init({
  ll_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: false,
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
  ll_level: {
    type: DataTypes.INTEGER
  },
  ll_nick_name: {
    type: DataTypes.STRING,
  },
  ll_pid: {
    type: DataTypes.INTEGER,
  },
  ll_p_username: {
    type: DataTypes.STRING,
  },
  ll_createdTime: {
    type: DataTypes.DATE,
  },
  ll_avatar: {
    type: DataTypes.STRING
  },
  ll_p_nick_name: {
    type: DataTypes.STRING
  }
},
  {
    tableName: "ll_article_comments_reply",
    sequelize,
  })

module.exports = ArticleCommentReply