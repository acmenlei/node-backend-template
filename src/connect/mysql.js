const Sequelize = require('sequelize');
const { Op } = require('sequelize')

const sequelize = new Sequelize('admin_top_blog', 'root', 'root', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    /* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
    pool: { max: 5, min: 0, acquire: 3000, idle: 10000 },
    define: { timestamps: false } // 不自动生成时间
});

module.exports = {
    sequelize,
    Op
};