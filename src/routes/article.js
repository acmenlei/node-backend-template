const express = require('express');
const router = express.Router();
const Article = require("../common/models/Article")

router.get("/list", async (request, response) => {
    // const {  } = request.query;
    const data = await Article.findAll();
    console.log(data);
})

module.exports = router;