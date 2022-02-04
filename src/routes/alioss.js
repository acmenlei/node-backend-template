const express = require('express');
const router = express.Router();
const config = require("../common/alioss/config");
const { STS } = require("ali-oss");
const Tip = require("../common/tip/tip")

/**
 * @api {POST} /alioss/getToken 获取阿里云临时token令牌
 * @apiDescription 获取阿里云临时token令牌
 * @apiName getToken
 * @apiSampleRequest /alioss/getToken
 * @apiGroup Alioss
 * @apiVersion 1.0.0
 */
router.post('/getToken', async(request, response) => {
    const client = new STS({
        accessKeyId: config.accessKeyId,
        accessKeySecret: config.accessKeySecret
    });
    try {
        const data = await client.assumeRole(config.roleArn, config.policy);
        data.credentials.region = config.region;
        data.credentials.bucket = config.bucket;
        return response.json({ code: 200, data, msg: Tip.OPERATOR_OK })
    } catch {
        return response.json({ code: -999, msg: Tip.OPERATOR_ERROR })
    }
});

module.exports = router;