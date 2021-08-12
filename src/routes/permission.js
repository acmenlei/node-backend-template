const express = require('express');
const Tip = require('../common/tip/tip');
const User = require('../models/User');
const router = express.Router();
const {
    queryPermission, generatePermissions
} = require('../permission')

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

router.post('/queryUserPermissionList', async (request, response) => {
    const { pageNum, pageSize, ll_username, ll_id } = request.body;
    const filterCondition = { ll_username, ll_id };
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