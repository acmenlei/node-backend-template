const Tip = require('../common/tip/tip')
const express = require('express');
const router = express.Router();
const Article = require("../models/Article");
const { Op } = require('../connect/mysql')
const { increaseArticlePublish } = require('../common/visual');

/**
 * @api {POST} /article/list 获取文章列表
 * @apiDescription 权限验证(将token和username携带在请求头)
 * @apiName list
 * @apiParam {Number} pageSize 每页数据条数
 * @apiParam {Number} pageNum 第几页
 * @apiParam (可选) {String} ll_category 模糊查询类别（可选）
 * @apiParam (可选) {String} ll_title 模糊查询标题（可选）
 * @apiSampleRequest /article/list
 * @apiGroup Article
 * @apiVersion 1.0.0
 */
router.post("/list", async (request, response) => {
    const { pageSize, pageNum, ll_category, ll_title } = request.body;
    try {
        const filterCondition = {
            ll_category,
            ll_title: {
                [Op.like]: `%${ll_title}%` // 模糊查询
            }
        };
        // 如果存在再查询 不存在则不放入where条件
        !ll_category && delete filterCondition.ll_category;
        !ll_title && delete filterCondition.ll_title;
        // 查询每页文章并 统计文章总数
        const { rows, count } = await Article.findAndCountAll({
            limit: Number(pageSize),
            offset: (pageNum - 1) * pageSize,
            where: filterCondition
        });
        return response.json({ data: rows, total: count, msg: Tip.SEARCH_OK, code: 200 })
    } catch (e) {
        return response.json({ msg: Tip.SEARCH_ERROR, code: -999 })
    }
})

/**
 * @api {POST} /article/single 获取单篇文章
 * @apiDescription 根据文章ID获取单篇文章
 * @apiName single
 * @apiParam {Number} ll_id 文章ID
 * @apiSampleRequest /article/single
 * @apiGroup Article
 * @apiVersion 1.0.0
 */
router.post("/single", async (request, response) => {
    const { ll_id } = request.body;
    try {
        const data = await Article.findOne({ where: { ll_id } })
        if (!data) {
            return response.json({ code: -998, msg: Tip.SEARCHDATA_IS_NULL })
        }
        return response.json({ code: 200, data, msg: Tip.SEARCH_OK })
    } catch (e) {
        return response.json({ code: -999, msg: Tip.SEARCH_ERROR })
    }
})

/**
 * @api {POST} /article/delete 删除单篇文章
 * @apiDescription 根据文章ID获取单篇文章
 * @apiName delete
 * @apiParam {Number} ll_id 文章ID
 * @apiSampleRequest /article/delete
 * @apiGroup Article
 * @apiVersion 1.0.0
 */
router.post('/delete', async (request, response) => {
    const { ll_id } = request.body;
    try {
        const count = await Article.destroy({ where: { ll_id } });
        if (!count) {
            return response.json({ code: -998, msg: Tip.SEARCHDATA_IS_NULL })
        }
        return response.json({ code: 200, count, msg: Tip.OPERATOR_OK })
    } catch (e) {
        return response.json({ code: -999, msg: Tip.OPERATOR_ERROR })
    }
})

/**
 * @api {POST} /article/publish 发表文章
 * @apiDescription 发表文章
 * @apiName publish
 * @apiParam {String} ll_title 文章标题
 * @apiParam {String} ll_introduce 文件简介
 * @apiParam {String} ll_content 文章文本内容
 * @apiParam {String} ll_content_html 文章所生成的HTML结构
 * @apiParam {String} ll_category 文章分类
 * @apiParam {String} ll_tags 文章标签
 * @apiParam {String} ll_cover 文章封面url地址
 * @apiSampleRequest /article/publish
 * @apiGroup Article
 * @apiVersion 1.0.0
 */
router.post("/publish", async (request, response) => {
    const {
        ll_title,
        ll_introduce,
        ll_content,
        ll_content_html,
        ll_category,
        ll_tags,
        ll_cover
    } = request.body,
        ll_id = new Date().getTime();
    try {
        const data = await Article.create({
            ll_id,
            ll_title,
            ll_introduce,
            ll_content,
            ll_content_html,
            ll_category,
            ll_tags,
            ll_cover
        });
        increaseArticlePublish(); // 文章发布数量自增
        return response.json({ data, msg: Tip.OPERATOR_OK, code: 200 })
    } catch {
        return response.json({ msg: Tip.OPERATOR_ERROR, code: -999 })
    }
})

/**
 * @api {POST} /article/update 更新文章
 * @apiDescription 更新文章
 * @apiName update
 * @apiParam {Number} ll_id 文章ID
 * @apiParam {String} ll_title 文章标题
 * @apiParam {String} ll_introduce 文章简介
 * @apiParam {String} ll_content 文章文本内容
 * @apiParam {String} ll_content_html 文章所生成的HTML结构
 * @apiParam {String} ll_category 文章分类
 * @apiParam {String} ll_tags 文章标签
 * @apiParam {String} ll_cover 文章封面url地址
 * @apiSampleRequest /article/update
 * @apiGroup Article
 * @apiVersion 1.0.0
 */
router.post("/update", async (request, response) => {
    const {
        ll_id,
        ll_title,
        ll_introduce,
        ll_content,
        ll_content_html,
        ll_category,
        ll_tags,
        ll_cover
    } = request.body;
    try {
        const data = await Article.update({
            ll_title,
            ll_introduce,
            ll_content,
            ll_content_html,
            ll_category,
            ll_tags,
            ll_cover
        }, { where: { ll_id } });
        return response.json({ data, msg: Tip.OPERATOR_OK, code: 200 })
    } catch {
        return response.json({ msg: Tip.OPERATOR_ERROR, code: 200 })
    }
})

module.exports = router;