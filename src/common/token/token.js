const TOKEN = 'token'
const RedisClient = require("../../connect/redis")
const { VerifyToken } = require('../../authentication/token')

// 验证token是否合格
function TOKEN_VERIFY(token, username) {
    return new Promise(async (resolve) => {
        try {
            const { code } = await VerifyToken(token) // 验证通过 code=200
            RedisClient.get(username + ':' + TOKEN, (err, reply) => {
                if (code !== 200 || reply == null) { // 当code不为200或者从redis查询的token为null
                    resolve(true) // 那么他就是非法操作
                } else {
                    resolve(false) // 否则验证通过
                }
            })
        } catch (error) {
            resolve(true) // 出错也抛出一个true
        }
    })

}

/* token令牌设置操作 */
function setToken(resp, hash, username) {
    resp.setHeader(TOKEN, hash) // 设置token
    RedisClient.SETEX(username + ':' + TOKEN, 60 * 60 * 10, hash) // 设置有效时间为10小时
}

module.exports = {
    TOKEN_VERIFY,
    setToken,
    TOKEN
}