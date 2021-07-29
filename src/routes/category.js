const express = require('express');
const { SEARCH_OK, SEARCH_ERROR } = require('../common/tip/tip');
const router = express.Router();
const Category = require("../models/Category")

router.get('/getCategorys', async (request, response) => {
    try {
        const data = await Category.findAll();
        return response.json({ code: 200, data, msg: SEARCH_OK })
    }
    catch {
        return response.json({ code: -999, msg: SEARCH_ERROR })
    }
})

module.exports = router;