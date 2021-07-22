const Sequelize  = require('sequelize');

const db = {}
// 方法 2: 分别传递参数 (其它数据库)
const sequelize = new Sequelize('admin-top-blog', 'root', 'root', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',/* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
    pool: { max: 5, min: 0, acquire: 3000, idle: 10000 }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
