const express = require('express');
const Tip = require('../common/tip/tip');
const router = express.Router();
const Tag = require("../models/tag")

router.get('/getTags', async(request, response) => {
    try {
        const data = await Tag.findAll();
        return response.json({ code: 200, data, msg: Tip.SEARCH_OK })
    } catch {
        return response.json({ code: -999, msg: Tip.SEARCH_ERROR })
    }
})

module.exports = router;