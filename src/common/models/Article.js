const db = require('../../connect/mysql');
const Sequelize = require('sequelize');

module.exports = db.sequelize.define('ll_article', {
    ll_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: false },
    ll_title: { type: Sequelize.STRING },
    ll_introduce: { type: Sequelize.STRING },
    ll_category: { type: Sequelize.STRING },
    ll_tags: { type: Sequelize.STRING },
    ll_visitedCounts: { type: Sequelize.INTEGER },
    ll_likedCounts: { type: Sequelize.INTEGER },
    ll_cover: { type: Sequelize.STRING }
})