const express = require('express');
const Tip = require('../common/tip/tip');
const router = express.Router();
const Category = require("../models/Category")
const { Op } = require('../connect/mysql')

/**
 * @api {GET} /category/getCategorys 获取所有分类
 * @apiDescription 获取所有分类
 * @apiName getCategorys
 * @apiSampleRequest /category/getCategorys
 * @apiGroup Category
 * @apiVersion 1.0.0
 */
router.get('/getCategorys', async(request, response) => {
    try {
        const data = await Category.findAll();
        return response.json({ code: 200, data, msg: Tip.SEARCH_OK })
    } catch {
        return response.json({ code: -999, msg: Tip.SEARCH_ERROR })
    }
})

/**
 * @api {POST} /category/list 获取所有分类列表
 * @apiDescription 获取所有分类列表以及分类总条数
 * @apiName list
 * @apiParam {Number} pageNum 第几页
 * @apiParam {Number} pageSize 每页多少条数据
 * @apiParam (可选) {Number} ll_id 类别ID
 * @apiParam (可选) {String} ll_category_name 类别名称
 * @apiSampleRequest /category/list
 * @apiGroup Category
 * @apiVersion 1.0.0
 */
router.post('/list', async(request, response) => {
    const { pageNum, pageSize, ll_id, ll_category_name } = request.body;
    const filterCondition = { ll_id, ll_category_name: { [Op.like]: `%${ll_category_name}%` } }
    !ll_id && delete filterCondition.ll_id;
    !ll_category_name && delete filterCondition.ll_category_name;
    try {
        const { rows, count } = await Category.findAndCountAll({
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
 * @api {POST} /category/delete 删除分类
 * @apiDescription 根据ID删除分类
 * @apiName delete
 * @apiParam {Number} ll_id 类别ID
 * @apiSampleRequest /category/delete
 * @apiGroup Category
 * @apiVersion 1.0.0
 */
router.post('/delete', async(request, response) => {
    const { ll_id } = request.body;
    try {
        const count = await Category.destroy({ where: { ll_id } });
        if(!count) {
            return response.json({ code: -998, msg: Tip.SEARCHDATA_IS_NULL })   
        }
        return response.json({ code: 200, count, msg: Tip.OPERATOR_OK })
    } catch {
        return response.json({ code: -999, msg: Tip.OPERATOR_ERROR })
    }
})

/**
 * @api {POST} /category/single 获取分类
 * @apiDescription 根据ID获取分类
 * @apiName single
 * @apiParam {Number} ll_id 类别ID
 * @apiSampleRequest /category/single
 * @apiGroup Category
 * @apiVersion 1.0.0
 */
router.post('/single', async(request, response) => {
    const { ll_id } = request.body;
    try {
        const data = await Category.findOne({ where: { ll_id } })
        if(!data) {
            return response.json({ code: -998, msg: Tip.SEARCHDATA_IS_NULL })   
        }
        return response.json({ code: 200, data, msg: Tip.SEARCH_OK })
    } catch (e) {
        return response.json({ code: -999, msg: Tip.SEARCH_ERROR })
    }
})

/**
 * @api {POST} /category/publish 新增分类
 * @apiDescription 新增分类
 * @apiName publish
 * @apiParam {String} ll_category_val 类别Code值
 * @apiParam {String} ll_category_name 类别名称
 * @apiSampleRequest /category/publish
 * @apiGroup Category
 * @apiVersion 1.0.0
 */
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

/**
 * @api {POST} /category/update 更新分类
 * @apiDescription 更新分类
 * @apiName update
 * @apiParam {String} ll_category_val 类别Code值
 * @apiParam {String} ll_category_name 类别名称
 * @apiSampleRequest /category/update
 * @apiGroup Category
 * @apiVersion 1.0.0
 */
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