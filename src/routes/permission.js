const express = require('express');
const { Op } = require('../connect/mysql');
const Tip = require('../common/tip/tip');
const Permission = require('../models/Permission');
const User = require('../models/User');
const router = express.Router();
const {
    queryPermission, generatePermissions, generatorAllPermissions
} = require('../permission')

/**
 * @api {POST} /permission/queryPermissions 获得某个用户
 * @apiDescription 通过用户名查询登录用户的所有权限
 * @apiName queryPermissions
 * @apiParam {String} ll_username 用户名
 * @apiSampleRequest /permission/queryPermissions
 * @apiGroup User
 * @apiVersion 1.0.0
 */
router.post('/queryPermissions', async(request, response) => {
    const {
        ll_username
    } = request.body;
    try {
        const permissions = await queryPermission(ll_username);
        return response.json({ permissions, code: 200, msg: Tip.SEARCH_OK })
    } catch {
        return response.json({ code: -999, msg: Tip.SEARCH_ERROR })
    }
})

/**
 * @api {POST} /permission/queryUserPermissionList 查询用户列表
 * @apiDescription 查询用户列表 以及权限列表
 * @apiName queryUserPermissionList
 * @apiParam {String} ll_username 用户名
 * @apiParam {Number} pageNum 第几页
 * @apiParam {Number} pageSize 每页多少条数据
 * @apiParam {Number} ll_id 用户ID
 * @apiSampleRequest /permission/queryUserPermissionList
 * @apiGroup User
 * @apiVersion 1.0.0
 */
router.post('/queryUserPermissionList', async (request, response) => {
    const { pageNum, pageSize, ll_username, ll_id } = request.body;
    const filterCondition = { 
        ll_username: { [Op.like]: `%${ll_username}%` },
        ll_id 
    };
    !ll_username && delete filterCondition.ll_username;
    !ll_id && delete filterCondition.ll_id;
    try {
        const { rows, count } = await User.findAndCountAll({ limit: Number(pageSize), offset: (pageNum - 1) * pageSize, where: filterCondition });
        let len = rows.length;
        for (let i = 0; i < len; i++) { // 将每个成员的权限字段生成嵌套模型
            rows[i].ll_permission = await generatePermissions(rows[i].ll_permission);
        }
        return response.json({ data: rows, total: count, code: 200, msg: Tip.SEARCH_OK });
    } catch {
        return response.json({ code: -999, msg: Tip.SEARCH_ERROR });
    }
})

/**
 * @api {POST} /permission/queryUserById 查询用户权限
 * @apiDescription 通过用户ID查询用户权限
 * @apiName queryUserById
 * @apiParam {Number} ll_id 用户ID
 * @apiSampleRequest /permission/queryUserById
 * @apiGroup User
 * @apiVersion 1.0.0
 */
router.post('/queryUserById', async (request, response) => {
    const { ll_id } = request.body;
    try {
        const data = await User.findOne({ attributes: ['ll_id', 'll_permission'], where: { ll_id } })
        if(!data) {
            return response.json({ code: -998, msg: Tip.SEARCHDATA_IS_NULL })   
        }
        data.ll_permission = data.ll_permission.split(',')
        return response.json({ data, msg: Tip.SEARCH_OK, code:  200 });
    } catch {
        return response.json({ msg: Tip.SEARCH_ERROR, code:  -999 });
    }
})

/**
 * @api {GET} /permission/queryAllPermissions 查询所有权限码
 * @apiDescription 查询所有权限码
 * @apiName queryAllPermissions
 * @apiSampleRequest /permission/queryAllPermissions
 * @apiGroup Permission
 * @apiVersion 1.0.0
 */
router.get('/queryAllPermissions', async (request, response) => {
    try {
        const data = await Permission.findAll();
        const permissions = await generatorAllPermissions(data); // 生成前端需要的目录结构
        return response.json({ data: permissions, code: 200, msg: Tip.SEARCH_OK })
    } catch {
        return response.json({ code: -999, msg: Tip.SEARCH_ERROR })
    }
})

/**
 * @api {POST} /permission/allocationPermissions 分配用户可用权限
 * @apiDescription 分配用户可用权限
 * @apiName allocationPermissions
 * @apiParam {Number} ll_id 用户ID
 * @apiParam {String} ll_permission 分配给用户的权限 以逗号分隔
 * @apiSampleRequest /permission/allocationPermissions
 * @apiGroup User
 * @apiVersion 1.0.0
 */
router.post('/allocationPermissions', async (request, response) => {
    const { ll_id, ll_permission } = request.body;
    try {
        await User.update({ ll_permission },{ where: { ll_id }});
        return response.json({ msg: Tip.OPERATOR_OK, code: 200 })
    } catch {
        return response.json({ msg: Tip.NETWORK_ERROR, code: -998 })
    }
})

module.exports = router;