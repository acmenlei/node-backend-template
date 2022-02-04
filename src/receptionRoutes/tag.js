const express = require("express");
const Tag = require("../models/tag");
const router = express.Router()
const Tip = require("../common/tip/tip")
/**
 * @api {GET} /reception/tag/getTags 获取所有标签
 * @apiDescription 获取所有标签
 * @apiName getTags
 * @apiSampleRequest /reception//tag/getTags
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

module.exports = router;