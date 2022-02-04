const express = require("express");
const Comment = require("../models/Comment");
const router = express.Router()
const Tip = require("../common/tip/tip");
// const { generatCommentTree } = require("../utils/generatCommentTree");
const CommentReply = require("../models/CommentReply");

// 查询所有留言
router.post("/queryComments", async (req, res) => {
  const { pageNum, pageSize } = req.body
  // console.log(pageNum, pageSize)
  try {
    const { rows, count } = await Comment.findAndCountAll({
      limit: Number(pageSize),
      offset: (pageNum - 1) * pageSize,
      order: [['ll_id', 'DESC']],
    })
    // 根据数据动态生成评论树
    // const data = await generatCommentTree(rows);
    for (let comment of rows) {
      const children = await CommentReply.findAll({ where: { ll_p_username: comment.ll_username, ll_pid: comment.ll_id } })
      comment.dataValues.children = children
    }
    return res.json({ code: 200, data: rows, total: count, msg: Tip.SEARCH_OK })
  } catch (e) {
    console.log(e.message)
    return res.json({ code: -99, msg: Tip.NETWORK_ERROR, err: e.message })
  }
})

// 删除留言
router.post("/remove", async (req, res) => {
  const { ll_id, ll_level, ll_username } = req.body;
  try {
    let count = 0
    if(ll_level == 1) {
      // 删除一级评论
      count = await Comment.destroy({ where: { ll_id } });
    } else {
      // 删除二级评论
      count = await CommentReply.destroy({ where: { ll_id } });
    }
    if (!count) {
      return res.json({ code: -998, msg: Tip.SEARCHDATA_IS_NULL })
    }
    if(ll_level == 1) {
      // 删除子集
      count += await CommentReply.destroy({ where : { ll_pid: ll_id, ll_p_username: ll_username } })
    }
    return res.json({ code: 200, count, msg: Tip.OPERATOR_OK })
  } catch (e) {
    console.log(e)
    return res.json({ code: -999, msg: Tip.OPERATOR_ERROR })
  }
})

// 发表一级留言
router.post('/publish', async (req, res) => {
  // 只是一级留言
  const {
    ll_username,
    ll_content,
    ll_nick_name,
    ll_avatar
  } = req.body
  try {
    const data = Comment.create({
      ll_id: Date.now(),
      ll_content,
      ll_nick_name,
      ll_username,
      ll_level: 1,
      ll_avatar
    })
    return res.json({ code: 200, data, msg: Tip.MESSAGE_PUBLISH_OK })
  } catch {
    // 网络出错的情况
    return res.json({ code: -99, msg: Tip.NETWORK_ERROR })
  }
})

// 二级留言接口
router.post("/reply", async (req, res) => {
  const {
    ll_username,
    ll_p_username,
    ll_pid,
    ll_nick_name,
    ll_avatar,
    ll_content,
    ll_p_nick_name
  } = req.body
  try {
    const data = CommentReply.create({
      ll_id: Date.now(),
      ll_content,
      ll_nick_name,
      ll_username,
      ll_avatar,
      ll_p_username,
      ll_pid,
      ll_level: 2,
      ll_p_nick_name
    })
    return res.json({ code: 200, data, msg: Tip.MESSAGE_PUBLISH_OK })
  } catch {
    // 网络出错的情况
    return res.json({ code: -99, msg: Tip.NETWORK_ERROR })
  }
})
module.exports = router
