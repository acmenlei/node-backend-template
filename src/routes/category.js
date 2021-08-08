const express = require('express');
const Tip = require('../common/tip/tip');
const router = express.Router();
const Category = require("../models/Category")

router.get('/getCategorys', async(request, response) => {
    try {
        const data = await Category.findAll();
        return response.json({ code: 200, data, msg: Tip.SEARCH_OK })
    } catch {
        return response.json({ code: -999, msg: Tip.SEARCH_ERROR })
    }
})

router.post('/list', async(request, response) => {
    const { pageNum, pageSize } = request.body;
    try {
        const { rows, count } = await Category.findAndCountAll({
            limit: Number(pageSize),
            offset: (pageNum - 1) * pageSize,
        })
        return response.json({ data: rows, total: count, msg: Tip.SEARCH_OK, code: 200 });
    } catch {
        return response.json({ code: -999, msg: Tip.SEARCH_ERROR })
    }
})

router.post('/delete', async(request, response) => {
    const { ll_id } = request.body;
    try {
        const count = await Category.destroy({ where: { ll_id } });
        return response.json({ code: 200, count, msg: Tip.OPERATOR_OK })
    } catch {
        return response.json({ code: -999, msg: Tip.OPERATOR_ERROR })
    }
})

router.post('/single', async(request, response) => {
    const { ll_id } = request.body;
    try {
        const data = await Category.findOne({ where: { ll_id } })
        return response.json({ code: 200, data, msg: Tip.SEARCH_OK })
    } catch (e) {
        return response.json({ code: -999, msg: Tip.SEARCH_ERROR })
    }
})

router.post('/publish', async(request, response) => {
    const { ll_category_val, ll_category_name } = request.body;
    const ll_id = new Date().getTime();
    try {
        const data = await Category.create({ ll_id, ll_category_val, ll_category_name })
        return response.json({ code: 200, data, msg: Tip.OPERATOR_OK })
    } catch {
        return response.json({ code: -999, msg: Tip.OPERATOR_ERROR })
    }
})

router.post('/update', async(request, response) => {
    const { ll_category_val, ll_category_name } = request.body;
    try {
        const data = await Category.update({ ll_category_name }, { where: { ll_category_val } })
        return response.json({ code: 200, data, msg: Tip.OPERATOR_OK })
    } catch (e) {
        return response.json({ code: -999, msg: Tip.OPERATOR_ERROR })
    }
})
module.exports = router;