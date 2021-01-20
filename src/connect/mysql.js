const mysql = require('mysql')

const config = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "201314",
    database: "study"
}

class MySQL {
    static connect;
    static getConnection() {
        MySQL.connect = mysql.createConnection(config)
        MySQL.connect.connect()
    }
    static close() {
        MySQL.connect.end()
    }
}
// 导出链接对象
module.exports = MySQL
