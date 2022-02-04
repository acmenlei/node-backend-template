const express = require('express');
const app = express();

/* 管理台路由 */
const adminRouter = require('./routes/admin');
const articleRouter = require('./routes/article');
const tagRouter = require('./routes/tag');
const categoryRouter = require('./routes/category');
const aliossRouter = require('./routes/alioss');
const visualRouter = require('./routes/visual');
const commentRouter = require('./routes/comment');
const permissionRouter = require('./routes/permission');
/* 前台路由 */
const receptionArticleRouter = require("./receptionRoutes/article")
const receptionTagRouter = require("./receptionRoutes/tag")
const receptionCategoryRouter = require("./receptionRoutes/category")
const receptionUserRouter = require("./receptionRoutes/user")
const receptionCommentRouter = require("./receptionRoutes/comment")
const receptionArticleCommentRouter = require("./receptionRoutes/articleComment")

const { instance } = require('./authentication/cookie-session');
const cors = require('cors');
const WHITE_LIST = require("./whiteList/list");
const { tokenVerify } = require("./intercepter/token");
const Tip = require('./common/tip/tip');
const { resolve } = require("path");

/* 定时任务引入 */
const { scheduleControl } = require('./schedule');
const { increaseVisited } = require('./common/visual')

app.use(instance); // 配置cookie
app.use(express.urlencoded({ extended: false })); // 接收post请求数据
app.use(express.json());
app.use("/source", express.static(resolve(__dirname, "public")))
app.use("/docs", express.static(resolve(__dirname, "../", "docs")))

// 跨域配置 （本地开发、内网穿透、码云pages服务）
app.use(cors({
    origin: ['http://localhost:3000','http://106.12.143.215:8080', 'http://106.12.143.215','http://localhost:8080', 'http://leilei.vicp.io', 'http://codeleilei.gitee.io'],
    credentials: true
}));

// 全局拦截验证token配置
app.use("*", async (req, resp, next) => {
    const { baseUrl } = req;
    /* 白名单过滤,登陆注册 访问静态资源等 操作不需要传递token */
    if (WHITE_LIST.includes(baseUrl) || baseUrl.startsWith('/source')) {
        return next();
    }
    if (baseUrl.startsWith("/reception") || baseUrl.startsWith("/api/reception")) {
        increaseVisited(); // 前端访问量自增
        // 匹配到前台路由
        return next();
    }
    /**
     * 1. 拿到前端请求头中的(token)与(用户名)进行有效检验
     * 2. 校验通过的话放行 不通过的话拦截
     */
    const { token, username } = req.headers;
    if (token == null || username == null) {
        return resp.json({ code: -999, msg: Tip.TOKEN_IS_UNDEFINED }); // 未携带token
    }
    try {
        await tokenVerify(token, username); // 验证通过
        next(); // 没有出错就是验证成功的情况
    } catch (e) {
        return e.msg === 'TokenExpiredError' ?
            resp.json({ code: -888, msg: Tip.TOKEN_IS_EXPIRESE }) : // token过期的情况
            resp.json({ code: -999, msg: Tip.TOKEN_IS_UNDEFINED }); // token错误的情况
    }
})
// 配置管理台路由
app.use('/admin', adminRouter);
app.use('/article', articleRouter);
app.use('/tag', tagRouter);
app.use('/category', categoryRouter);
app.use('/alioss', aliossRouter);
app.use('/visual', visualRouter);
app.use('/comment', commentRouter);
app.use('/permission', permissionRouter);

// 配置前台路由
app.use('/reception/article', receptionArticleRouter);
app.use('/reception/category', receptionCategoryRouter);
app.use('/reception/tag', receptionTagRouter);
app.use('/reception/user', receptionUserRouter);
app.use('/reception/comment', receptionCommentRouter);
app.use('/reception/articleComment', receptionArticleCommentRouter);
/* 定时任务执行 */
scheduleControl()

app.listen(9001);
