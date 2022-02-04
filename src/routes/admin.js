const express = require('express');
const router = express.Router();
const Tip = require('../common/tip/tip'); // 提示信息
const User = require("../models/User")
const { setToken, tokenVerify, deleteToken } = require("../intercepter/token");
const { GenerateToken } = require("../authentication/token");
const { AES, AESparse } = require("../authentication/hash");
const { queryPermission } = require('../permission')

/**
 * @api {POST} /admin/register 注册角色
 * @apiDescription 注册角色
 * @apiName register
 * @apiParam {String} ll_username 用户名
 * @apiParam {String} ll_password 密码
 * @apiParam {String} ll_description 描述信息
 * @apiParam {String} ll_email 用户邮箱
 * @apiParam {String} ll_permission 用户权限 以逗号分隔
 * @apiSampleRequest /admin/register
 * @apiGroup User
 * @apiVersion 1.0.0
 */
router.post('/register', async(request, response) => {
    const { ll_username, ll_password, ll_description, ll_email, ll_permission } = request.body;
    try {
        const dataValues = await User.findOne({ where: { ll_username } });
        if (dataValues != null) { // 账户已存在的情况
            return response.json({ code: -96, msg: Tip.REGISTER_IS_EXISTS });
        }
    } catch {
        return response.json({ code: -93, msg: Tip.NETWORK_ERROR })
    }
    const HASH_STRING = AES(ll_password); // 加密密码
    const ll_id = new Date().getTime();
    // 不存在当前用户就创建
    try {
        await User.create({ ll_id, ll_username, ll_password: HASH_STRING, ll_description, ll_email, ll_permission });
        return response.json({ code: 200, msg: Tip.REGISTER_OK });
    } catch (e) {
        return response.json({ code: -95, msg: Tip.REGISTER_FAILURE })
    }
})

/**
 * @api {POST} /admin/loginout 退出登录/注销
 * @apiDescription 退出登录/注销
 * @apiName loginout
 * @apiParam {String} ll_username 用户名
 * @apiSampleRequest /admin/loginout
 * @apiGroup User
 * @apiVersion 1.0.0
 */
router.post("/loginout", async(request, response) => {
    const { ll_username } = request.body;
    deleteToken(ll_username);
    return response.json({ code: 200, msg: Tip.LOGIN_OUT });
})

/**
 * @api {POST} /admin/login 登陆后台
 * @apiDescription 登陆后台
 * @apiName login
 * @apiParam {String} ll_username 用户名
 * @apiParam {String} ll_password 密码
 * @apiSampleRequest /admin/login
 * @apiGroup User
 * @apiVersion 1.0.0
 */
router.post('/login', async(request, response) => {
    const { ll_username, ll_password } = request.body;
    try {
        const dataValues = await User.findOne({ where: { ll_username } });
        if (dataValues != null) {
            if (AESparse(dataValues.ll_password) === ll_password) {
                try {
                    const TOKEN = await GenerateToken({ ll_username }, "24h");
                    setToken(response, TOKEN, ll_username);
                    // 今日登录人数增加
                    // increaseLogin();
                    return response.json({ code: 200, msg: Tip.LOGIN_OK });
                } catch {
                    return response.json({ code: -999, msg: Tip.NETWORK_ERROR });
                }
            } else {
                return response.json({ code: -999, msg: Tip.LOGIN_FAILED });
            }
        } else {
            return response.json({ code: -999, msg: Tip.USERNAME_IS_NULL });
        }
    } catch (e) {
        console.log(e);
        return response.json({ code: -999, msg: Tip.LOGIN_FAILED });
    }
})

/**
 * @api {POST} /admin/update 更新用户信息
 * @apiDescription 更新用户信息
 * @apiName update
 * @apiParam {Number} ll_id 用户ID
 * @apiParam {String} ll_username 用户名
 * @apiParam {String} ll_password 密码
 * @apiParam {String} ll_description 用户描述信息
 * @apiParam {String} ll_permission 用户权限 以逗号分隔
 * @apiSampleRequest /admin/update
 * @apiGroup User
 * @apiVersion 1.0.0
 */
router.post('/update', async (request, response) => {
    const { ll_id, ll_username, ll_password, ll_description, ll_permission } = request.body;
    const HASH = AES(ll_password); // 加密密码
    try {
        const record = await User.update({ll_username, ll_password: HASH, ll_description, ll_permission}, { where: { ll_id } });
        return response.json({ code: 200, msg: Tip.OPERATOR_OK, data: record });
    } catch {
        return response.json({ code: -999, msg: Tip.OPERATOR_ERROR })
    }
})

/**
 * @api {POST} /admin/delete 根据id删除用户
 * @apiDescription 根据id删除用户
 * @apiName delete
 * @apiParam {Number} ll_id 用户ID
 * @apiSampleRequest /admin/delete
 * @apiGroup User
 * @apiVersion 1.0.0
 */
router.post('/delete', async (request, response) => {
    const { ll_id } = request.body;
    try {
        const count = await User.destroy({ where: { ll_id } });
        if(!count) {
            return response.json({ code: -998, msg: Tip.SEARCHDATA_IS_NULL })   
        }
        return response.json({ code: 200, msg: Tip.OPERATOR_OK, count })   
    } catch {
        return response.json({ code: -999, msg: Tip.OPERATOR_ERROR })   
    }
})

/**
 * @api {POST} /admin/single 根据id查用户
 * @apiDescription 根据id查用户
 * @apiName single
 * @apiParam {Number} ll_id 用户ID
 * @apiSampleRequest /admin/single
 * @apiGroup User
 * @apiVersion 1.0.0
 */
router.post('/single', async (request, response) => {
    const { ll_id } = request.body;
    try {
        const data = await User.findOne({ where: { ll_id } });
        if(data != null) {
            data.ll_password = AESparse(data.ll_password);
            return response.json({ code: 200, msg: Tip.SEARCH_OK, data })
        }
        return response.json({ code: -999, msg: Tip.SEARCHDATA_IS_NULL })
    } catch {
        return response.json({ code: -999, msg: Tip.SEARCH_ERROR })
    }
})

/**
 * @api {POST} /admin/verify 权限验证
 * @apiDescription 权限验证(将token和username携带在请求头)
 * @apiName verify
 * @apiParam {String} routeCode 路由Code码 前端路由配置项中的Code
 * @apiSampleRequest /admin/verify
 * @apiGroup User
 * @apiVersion 1.0.0
 */
router.post('/verify', async(request, response) => {
    const { token, username } = request.headers;
    const { routeCode } = request.body;
    try {
        await tokenVerify(token, username);
        const permissions = await queryPermission(username);
        if(!permissions.includes(routeCode)) {
            return response.json({ code: -422, msg: Tip.TOKEN_IS_EXPIRESE }); // 没有访问权限
        }
        return response.json({ code: 200, msg: "ok" });
    } catch (reason) {
        return reason.msg === 'TokenExpiredError' ?
            response.json({ code: -888, msg: Tip.TOKEN_IS_EXPIRESE }) : // token过期的情况
            response.json({ code: -999, msg: Tip.TOKEN_IS_UNDEFINED }); // token错误的情况
    }
})

module.exports = router;