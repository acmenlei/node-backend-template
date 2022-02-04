const express = require('express');
const ReceptionUser = require('../models/ReceptionUser');
const router = express.Router()
const Tip = require("../common/tip/tip");
const { AESparse, AES } = require('../authentication/hash');
const { increaseRegister, increaseLogin } = require('../common/visual');

/**
 * @api {POST} /reception/user/login 登陆后台
 * @apiDescription 前台用户登录
 * @apiName login
 * @apiParam {String} ll_username 用户名
 * @apiParam {String} ll_password 密码
 * @apiSampleRequest /admin/login
 * @apiGroup ReceptionUser
 * @apiVersion 1.0.0
 */
router.post('/login', async (request, response) => {
  const { ll_username, ll_password } = request.body;
  try {
    const dataValues = await ReceptionUser.findOne({ where: { ll_username } });
    if (dataValues != null) {
      if (AESparse(dataValues.ll_password) === ll_password) {
        try {
          // 前台登录使用session控制登录 有效期24小时（一天）
          request.session.receptionUserLogin = true
          request.session.receptionUsername = ll_username
          // 今日登录人数增加
          increaseLogin();
          //返回登录信息
          dataValues.ll_password = null
          return response.json({ code: 200, data: dataValues, msg: Tip.LOGIN_OK });
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
    // console.log(e);
    return response.json({ code: -999, msg: Tip.LOGIN_FAILED });
  }
})

/**
 * @api {POST} /reception/user/register 注册角色
 * @apiDescription 前台用户注册
 * @apiName register
 * @apiParam {String} ll_username 用户名
 * @apiParam {String} ll_password 密码
 * @apiSampleRequest /reception/user/register
 * @apiGroup ReceptionUser
 * @apiVersion 1.0.0
 */
router.post('/register', async (request, response) => {
  const { ll_username, ll_password } = request.body;
  try {
    const dataValues = await ReceptionUser.findOne({ where: { ll_username } });
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
    await ReceptionUser.create({ ll_id, ll_username, ll_password: HASH_STRING });
    increaseRegister(); // 今日注册人数增加
    return response.json({ code: 200, msg: Tip.REGISTER_OK });
  } catch (e) {
    console.log(e)
    return response.json({ code: -95, msg: Tip.REGISTER_FAILURE })
  }
})

/**
 * @api {POST} /reception/user/verify 验证是否登录
 * @apiDescription 前台用户是否登录
 * @apiName verify
 * @apiParam {String} ll_username 用户名
 * @apiSampleRequest /reception/user/verify
 * @apiGroup ReceptionUser
 * @apiVersion 1.0.0
 */
router.post("/verify", async (request, response) => {
  const { receptionUserLogin, receptionUsername } = request.session
  if (receptionUserLogin) {
    // 登录状态 返回登录信息
    const userInfo = await ReceptionUser.findOne({ where: { ll_username: receptionUsername } })
    return response.json({ code: 666, data: userInfo })
  }
  // 未登录
  return response.json({ code: -999, msg: Tip.LOGIN_IS_NULL })
})

router.post("/logout", (request, response) => {
  const { ll_username } = request.body
  // 简单验证
  if (request.session.receptionUsername == ll_username) {
    // console.log(`ll_username:${ll_username}`, request.sessionID)
    request.session.destroy(() => {
      return response.json({ code: 200, msg: Tip.LOGIN_OUT })
    })
  } else {
    // 验证不通过
    return response.json({ code: -999, msg: Tip.NETWORK_ERROR })
  }
})

// 更新用户昵称
router.post('/update', async (req, res) => {
  const { ll_id, ll_nick_name } = req.body
  try {
    const count = await ReceptionUser.update({ ll_nick_name }, { where: { ll_id } })
    if (!count) {
      return res.json({ code: -98, msg: Tip.SEARCHDATA_IS_NULL })
    }
    return res.json({ code: 200, msg: Tip.OPERATOR_OK })
  } catch {
    return res.json({ code: -99, msg: Tip.NETWORK_ERROR })
  }
})

// 修改密码
router.post('/pwd', async (req, res) => {
  const { new_password, old_password, ll_id } = req.body
  // 验证旧密码是否一致
  try {
    const dataValues = await ReceptionUser.findOne({ where: { ll_id }, attributes: ['ll_password'] })
    if (!dataValues) {
      return res.json({ code: -99, msg: Tip.SEARCHDATA_IS_NULL })
    }
    // 验证是否正确
    if (AESparse(dataValues.ll_password) === old_password) {
      // 进行修改
      const pwd = AES(new_password)
      await ReceptionUser.update({ ll_password: pwd }, { where: { ll_id } })
      // 销毁当前登录状态
      req.session.destroy()
      return res.json({ code: 200, msg: Tip.OPERATOR_OK })
    }
  } catch {
    return res.json({ code: -99, msg: Tip.NETWORK_ERROR })
  }
})

module.exports = router