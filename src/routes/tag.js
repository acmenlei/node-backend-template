const express = require('express');
const Tip = require('../common/tip/tip');
const router = express.Router();
const Tag = require("../models/tag")
const { Op } = require('../connect/mysql')

/**
 * @api {GET} /tag/getTags 获取所有标签
 * @apiDescription 获取所有标签
 * @apiName getTags
 * @apiSampleRequest /tag/getTags
 * @apiGroup Tag
 * @apiVersion 1.0.0
 */
router.get('/getTags', async(request, response) => {
    try {
        const data = await Tag.findAll();
        return response.json({ code: 200, data, msg: Tip.SEARCH_OK })
    } catch {
        return response.json({ code: -999, msg: Tip.SEARCH_ERROR })
    }
})

/**
 * @api {POST} /tag/list 获取标签列表
 * @apiDescription 获取所有标签列表以及总条数
 * @apiName list
 * @apiParam {Number} pageNum 第几页
 * @apiParam {Number} pageSize 每页多少条数据
 * @apiParam (可选) {Number} ll_id 标签ID
 * @apiParam (可选) {String} ll_tag_name 标签名
 * @apiSampleRequest /tag/list
 * @apiGroup Tag
 * @apiVersion 1.0.0
 */
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

/**
 * @api {POST} /tag/delete 删除标签
 * @apiDescription 根据ID删除标签
 * @apiName delete
 * @apiParam {Number} ll_id 标签ID
 * @apiSampleRequest /tag/delete
 * @apiGroup Tag
 * @apiVersion 1.0.0
 */
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

/**
 * @api {POST} /tag/single 获取标签
 * @apiDescription 根据ID获取标签
 * @apiName single
 * @apiParam {Number} ll_id 标签ID
 * @apiSampleRequest /tag/single
 * @apiGroup Tag
 * @apiVersion 1.0.0
 */
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

/**
 * @api {POST} /tag/publish 新增标签
 * @apiDescription 新增标签
 * @apiName publish
 * @apiParam {String} ll_tag_val 标签Code值
 * @apiParam {String} ll_tag_name 标签名称
 * @apiSampleRequest /tag/publish
 * @apiGroup Tag
 * @apiVersion 1.0.0
 */
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

/**
 * @api {POST} /tag/update 更新标签
 * @apiDescription 更新标签
 * @apiName update
 * @apiParam {String} ll_tag_val 标签Code值
 * @apiParam {String} ll_tag_name 标签名称
 * @apiSampleRequest /tag/update
 * @apiGroup Tag
 * @apiVersion 1.0.0
 */
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