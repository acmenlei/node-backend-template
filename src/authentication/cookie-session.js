const COOKIE_SESSION = require('cookie-session')

module.exports = COOKIE_SESSION({
    name: "express-app-server",
    keys:["key1, key2", "key3"],
    maxAge: 60 * 60 * 1000 * 24 // 有效期一天
})