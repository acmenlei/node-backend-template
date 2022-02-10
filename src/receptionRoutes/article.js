const express = require("express");
const Article = require("../models/Article");
const router = express.Router()
const Tip = require("../common/tip/tip");
const { Op } = require('../connect/mysql')
const dayjs = require('dayjs');
const { formatTime } = require("../utils/format");

/**
 * @api {POST} /reception/article/list 获取文章列表
 * @apiDescription 权限验证(将token和username携带在请求头)
 * @apiName list
 * @apiParam {Number} pageSize 每页数据条数
 * @apiParam {Number} pageNum 第几页
 * @apiParam (可选) {String} ll_category 模糊查询类别（可选）
 * @apiParam (可选) {String} ll_title 模糊查询标题（可选）
 * @apiSampleRequest /reception/article/list
 * @apiGroup Article
 * @apiVersion 1.0.0
 */
router.post("/list", async (request, response) => {
    const { pageSize, pageNum, ll_category, ll_title, keyword } = request.body;
    try {
        const filterCondition = {
            ll_category,
            ll_title: {
                [Op.like]: `%${ll_title}%` // 模糊查询
            },
            ll_tags: {
                [Op.like]: `%${keyword}%`
            }
        };
        // 如果存在再查询 不存在则不放入where条件
        !ll_category && delete filterCondition.ll_category;
        !ll_title && delete filterCondition.ll_title;
        !keyword && delete filterCondition.ll_tags;
        // 查询每页文章并 统计文章总数
        const { rows, count } = await Article.findAndCountAll({
            limit: Number(pageSize),
            offset: (pageNum - 1) * pageSize,
            where: filterCondition,
            order: [['ll_id', 'DESC']],
        });
        return response.json({ data: rows, total: count, msg: Tip.SEARCH_OK, code: 200 })
    } catch (e) {
        return response.json({ msg: Tip.SEARCH_ERROR, code: -999, e })
    }
})

/* 前台接口 */
/**
 * @api {GET} /reception/article/getAndCountCategory 分组获取文章条数
 * @apiDescription 分组获取文章条数
 * @apiName getAndCountCategory
 * @apiSampleRequest /article/getAndCountCategory
 * @apiGroup Article
 * @apiVersion 1.0.0
 */
router.get("/getAndCountCategory", async (request, response) => {
    try {
        const { rows, count } = await Article.findAndCountAll({ attributes: ["ll_category"], group: "ll_category" });
        return response.json({ code: 200, data: rows, counts: count, msg: Tip.SEARCH_OK })
    } catch {
        return response.json({ code: -999, msg: Tip.SEARCH_ERROR })
    }
})

/* 前台接口 */
/**
 * @api {GET} /reception/article/getRecentArticle 获取最近发表文章
 * @apiDescription 获取最近发表文章
 * @apiName getAndCountCategory
 * @apiSampleRequest /reception/article/getRecentArticle
 * @apiGroup Article
 * @apiVersion 1.0.0
 */
router.get("/getRecentArticle", async (request, response) => {
    try {
        let gap = 1000 * 60 * 60 * 24 * 30
        let endTime = Date.now();
        let startTime = endTime - gap;
        const data = await Article.findAll({
            where: {
                [Op.and]: [{ ll_updatedTime: { [Op.between]: [formatTime(startTime), formatTime(endTime)] } }]
            },
            order: [['ll_id', 'DESC']],
        })
        return response.json({ code: 200, data, msg: Tip.SEARCH_OK })
    } catch (error) {
        return response.json({ code: -999, msg: Tip.SEARCH_ERROR })
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

module.exports = router;