const express = require('express');
const router = express.Router();
const Tip = require('../common/tip/tip'); // 提示信息
const { TOKEN, SET_TOKEN, TOKEN_VERIFY } = require("../common/token/token");
const RedisClient = require('../connect/redis');
const { GenerateToken } = require("../authentication/token");
const { AES, AESparse } = require("../authentication/hash");
const User = require("../models/User")

/* 注册操作 */
router.post('/register', async (request, response) => {
    const { ll_username, ll_password, ll_sex } = request.body;
    try {
        const dataValues = await User.findOne({ where: { ll_username } });
        if (dataValues != null) {  // 账户已存在的情况
            return response.json({ code: -96, msg: Tip.REGISTER_IS_EXISTS });
        }
    } catch {
        return response.json({ code: -93, msg: Tip.NETWORK_ERROR })
    }
    const HASH_STRING = AES(ll_password); // 加密密码
    const ll_id = new Date().getTime();
    // 不存在当前用户就创建
    try {
        await User.create({ ll_id, ll_username, ll_password: HASH_STRING, ll_sex });
        const TOEKN = await GenerateToken({ ll_username }, "24h"); // token有效期一天
        SET_TOKEN(response, TOEKN, ll_username) // 设置token操作
        return response.json({ code: 200, msg: Tip.REGISTER_OK });
    }
    catch (e) {
        return response.json({ code: -95, msg: Tip.REGISTER_FAILURE })
    }
})

/* 退出登陆操作 */
router.post("/loginout", async (request, response) => {
    const { ll_username } = request.body;
    RedisClient.del(`${ll_username}:${TOKEN}`); // 删除token, 客户端的token将失效
    return response.json({ code: 200, msg: Tip.LOGIN_OUT });
})

/* 登陆操作 (登陆是不存在token的) */
router.post('/login', async (request, response) => {
    const { ll_username, ll_password } = request.body;
    try {
        const dataValues = await User.findOne({ where: { ll_username } });
        if (dataValues != null) {
            if (AESparse(dataValues.ll_password) === ll_password) {
                try {
                    const TOKEN = await GenerateToken({ ll_username }, "24h");
                    SET_TOKEN(response, TOKEN, ll_username);
                    return response.json({ code: 200, msg: Tip.LOGIN_OK });
                } catch {
                    return response.json({ code: -65, msg: Tip.NETWORK_ERROR });
                }
            } else {
                return response.json({ code: -65, msg: Tip.LOGIN_FAILED });
            }
        } else {
            return response.json({ code: -77, msg: Tip.USERNAME_IS_NULL });
        }
    } catch (e) {
        console.log(e);
        return response.json({ code: -65, msg: Tip.LOGIN_FAILED });
    }
})
/* 权限验证 */
router.post('/verify', async (request, response) => {
    const { token, username } = request.headers;
    try {
        await TOKEN_VERIFY(token, username);
        return response.json({ code: 200, msg: "ok" });
    } catch (reason) {
        return reason.msg === 'TokenExpiredError' ?
            response.json({ code: -888, msg: Tip.TOKEN_IS_EXPIRESE }) : // token过期的情况
            response.json({ code: -999, msg: Tip.TOKEN_IS_UNDEFINED }); // token错误的情况
    }
})

module.exports = router;