const express = require("express");
const Comment = require("../models/Comment");
const router = express.Router()
const Tip = require("../common/tip/tip");
const CommentReply = require("../models/CommentReply");
const { Op } = require('../connect/mysql')

router.post('/queryComments', async (req, res) => {
  const { pageSize, pageNum, ll_content } = req.body
  // console.log(pageSize, pageNum)
  try {
    const filterCondition = {
      ll_content: {
        [Op.like]: `%${ll_content}%` // 模糊查询
      }
    };
    // 如果存在再查询 不存在则不放入where条件
    !ll_content && delete filterCondition.ll_content;
    // 查询每页文章并 统计文章总数
    const { rows, count } = await Comment.findAndCountAll({
      limit: Number(pageSize),
      offset: (pageNum - 1) * pageSize,
      where: filterCondition
    });
    return res.json({ data: rows, total: count, msg: Tip.SEARCH_OK, code: 200 })
  } catch (e) {
    return res.json({ msg: Tip.SEARCH_ERROR, code: -999 })
  }
})

router.post('/queryCommentsReplyById', async (req, res) => {
  const { pageSize, pageNum, ll_content, ll_pid, ll_p_username } = req.body
  try {
    const filterCondition = {
      ll_pid,
      ll_p_username,
      ll_content: {
        [Op.like]: `%${ll_content}%` // 模糊查询
      }
    };
    // 如果存在再查询 不存在则不放入where条件
    !ll_content && delete filterCondition.ll_content;
    // 查询每页文章并 统计文章总数
    const { rows, count } = await CommentReply.findAndCountAll({
      limit: Number(pageSize),
      offset: (pageNum - 1) * pageSize,
      where: filterCondition
    });
    return res.json({ data: rows, total: count, msg: Tip.SEARCH_OK, code: 200 })
  } catch (e) {
    console.log(e)
    return res.json({ msg: Tip.SEARCH_ERROR, code: -999 })
  }
})

router.post('/remove', async (req, res) => {
  const { ll_id, ll_level, ll_username } = req.body;
  try {
    let count = 0
    if (ll_level == 1) {
      // 删除一级评论
      count = await Comment.destroy({ where: { ll_id } });
    } else {
      // 删除二级评论
      count = await CommentReply.destroy({ where: { ll_id } });
    }
    if (!count) {
      return res.json({ code: -998, msg: Tip.SEARCHDATA_IS_NULL })
    }
    if (ll_level == 1) {
      // 删除子集
      count += await CommentReply.destroy({ where: { ll_pid: ll_id, ll_p_username: ll_username } })
    }
    return res.json({ code: 200, count, msg: Tip.OPERATOR_OK })
  } catch (e) {
    console.log(e)
    return res.json({ code: -999, msg: Tip.OPERATOR_ERROR })
  }
})

module.exports = router