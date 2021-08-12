const express = require('express');
const Tip = require('../common/tip/tip');
const router = express.Router();
const Tag = require("../models/tag")
const { Op } = require('../connect/mysql')

router.get('/getTags', async(request, response) => {
    try {
        const data = await Tag.findAll();
        return response.json({ code: 200, data, msg: Tip.SEARCH_OK })
    } catch {
        return response.json({ code: -999, msg: Tip.SEARCH_ERROR })
    }
})

router.post('/list', async(request, response) => {
    const { pageNum, pageSize, ll_id, ll_tag_name } = request.body;
    const filterCondition = { ll_id, ll_tag_name: { [Op.like]: `%${ll_tag_name}%` } };
    !ll_id && delete filterCondition.ll_id;
    !ll_tag_name && delete filterCondition.ll_tag_name;
    try {
        const { rows, count } = await Tag.findAndCountAll({
            limit: Number(pageSize),
            offset: (pageNum - 1) * pageSize,
            where: filterCondition
        })
        return response.json({ data: rows, total: count, msg: Tip.SEARCH_OK, code: 200 });
    } catch {
        return response.json({ code: -999, msg: Tip.SEARCH_ERROR })
    }
})

router.post('/delete', async(request, response) => {
    const { ll_id } = request.body;
    try {
        const count = await Tag.destroy({ where: { ll_id } });
        if(!count) {
            return response.json({ code: -998, msg: Tip.SEARCHDATA_IS_NULL })   
        }
        return response.json({ code: 200, count, msg: Tip.OPERATOR_OK })
    } catch {
        return response.json({ code: -999, msg: Tip.OPERATOR_ERROR })
    }
})

router.post('/single', async(request, response) => {
    const { ll_id } = request.body;
    try {
        const data = await Tag.findOne({ where: { ll_id } })
        if(!data) {
            return response.json({ code: -998, msg: Tip.SEARCHDATA_IS_NULL })   
        }
        return response.json({ code: 200, data, msg: Tip.SEARCH_OK })
    } catch (e) {
        return response.json({ code: -999, msg: Tip.SEARCH_ERROR })
    }
})

router.post('/publish', async(request, response) => {
    const { ll_tag_val, ll_tag_name } = request.body;
    const ll_id = new Date().getTime();
    try {
        const data = await Tag.create({ ll_id, ll_tag_val, ll_tag_name })
        return response.json({ code: 200, data, msg: Tip.OPERATOR_OK })
    } catch {
        return response.json({ code: -999, msg: Tip.OPERATOR_ERROR })
    }
})

router.post('/update', async(request, response) => {
    const { ll_tag_val, ll_tag_name } = request.body;
    try {
        const data = await Tag.update({ ll_tag_name }, { where: { ll_tag_val } })
        return response.json({ code: 200, data, msg: Tip.OPERATOR_OK })
    } catch (e) {
        return response.json({ code: -999, msg: Tip.OPERATOR_ERROR })
    }
})

module.exports = router;