const express = require("express");
const Category = require("../models/Category");
const router = express.Router()
const Tip = require("../common/tip/tip")
/**
 * @api {GET} /reception/category/getCategorys 获取所有分类
 * @apiDescription 获取所有分类
 * @apiName getCategorys
 * @apiSampleRequest /reception/category/getCategorys
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
module.exports = router;