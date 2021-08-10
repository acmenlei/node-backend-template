const express = require('express');
const Tip = require('../common/tip/tip');
const router = express.Router();
const {
    queryPermission
} = require('../permission')

router.post('/queryPermissions', async(request, response) => {
    const {
        ll_username
    } = request.body;
    try {
        const perimssions = await queryPermission(ll_username);
        return response.json({ permissions: perimssions.split(','), code: 200, msg: Tip.SEARCH_OK })
    } catch {
        return response.json({ code: -999, msg: Tip.SEARCH_ERROR })
    }
})

module.exports = router;