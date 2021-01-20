const TOKEN = 'token'
const RedisClient = require("../../connect/redis")

// 验证token是否合格
function TOKEN_VERIFY(token) {
    return !token || !RedisClient.get(TOKEN)
}

module.exports = {
    TOKEN_VERIFY,
    TOKEN
}