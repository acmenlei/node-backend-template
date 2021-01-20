const MySQL = require('../connect/mysql')

function SQLQuery({ sql, values = [], timeout = 4000 }, cb) {
    MySQL.getConnection()
    MySQL.connect.query({ sql, timeout, values: values && values }, cb)
};

module.exports = SQLQuery