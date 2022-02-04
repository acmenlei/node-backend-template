const express = require("express");
const ArticleComment = require("../models/ArticleComment");
const ArticleCommentReply = require("../models/ArticleCommentReply");
const router = express.Router()
const Tip = require("../common/tip/tip");

router.post("/queryAllArticleCommentsById", async (req, res) => {
  const { ll_id } = req.body
  try {
    const { rows, count } = await ArticleComment.findAndCountAll({
      where: { ll_article_id: ll_id },
      order: [['ll_id', 'DESC']]
    });
    // 查找所有评论的子评论
    for (let comment of rows) {
      const children = await ArticleCommentReply.findAll({
        where: {
          ll_p_username: comment.ll_username,
          ll_pid: comment.ll_id,
          ll_article_id: ll_id
        }
      })
      comment.dataValues.children = children
    }
    return res.json({ code: 200, msg: Tip.SEARCH_OK, data: rows, total: count })
  } catch(e) {
    // 网络错误
    console.log(e.message)
    return res.json({ code: -99, msg: Tip.NETWORK_ERROR, e })
  }
})
// 一级评论
router.post("/publish", async (req, res) => {
  const {
    ll_article_id,
    ll_content,
    ll_username,
    ll_nick_name,
    ll_avatar,
  } = req.body
  try {
    const data = await ArticleComment.create({
      ll_id: Date.now(),
      ll_article_id,
      ll_content,
      ll_username,
      ll_nick_name,
      ll_avatar,
      ll_level: 1
    })
    return res.json({ code: 200, data, msg: Tip.MESSAGE_PUBLISH_OK })
  } catch {
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
    ll_article_id,
    ll_p_nick_name
  } = req.body
  try {
    const data = ArticleCommentReply.create({
      ll_id: Date.now(),
      ll_content,
      ll_nick_name,
      ll_username,
      ll_avatar,
      ll_p_username,
      ll_pid,
      ll_level: 2,
      ll_p_nick_name,
      ll_article_id
    })
    return res.json({ code: 200, data, msg: Tip.MESSAGE_PUBLISH_OK })
  } catch {
    // 网络出错的情况
    return res.json({ code: -99, msg: Tip.NETWORK_ERROR })
  }
})


// 删除留言
router.post("/remove", async (req, res) => {
  const { ll_id, ll_level, ll_username, ll_article_id } = req.body;
  try {
    let count = 0
    if (ll_level == 1) {
      // 删除一级评论(每条评论的id是唯一的)
      count = await ArticleComment.destroy({ where: { ll_id, ll_article_id } });
    } else {
      // 删除二级评论
      count = await ArticleCommentReply.destroy({ where: { ll_id, ll_article_id } });
    }
    if (!count) {
      return res.json({ code: -998, msg: Tip.SEARCHDATA_IS_NULL })
    }
    if (ll_level == 1) {
      // 删除子集
      count += await ArticleCommentReply.destroy({ where: { ll_pid: ll_id, ll_article_id, ll_p_username: ll_username } })
    }
    return res.json({ code: 200, count, msg: Tip.OPERATOR_OK })
  } catch (e) {
    console.log(e)
    return res.json({ code: -999, msg: Tip.OPERATOR_ERROR })
  }
})
module.exports = router