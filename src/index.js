const express = require('express');
const app = express();
/* 路由 */
const adminRouter = require('./routes/admin');
const articleRouter = require('./routes/article');
const tagRouter = require('./routes/tag');
const categoryRouter = require('./routes/category');
const aliossRouter = require('./routes/alioss');
const visualRouter = require('./routes/visual');
const permissionRouter = require('./routes/permission');

const cookieConfig = require('./authentication/cookie-session');
const cors = require('cors');
const WHITE_LIST = require("./whiteList/list");
const { tokenVerify } = require("./intercepter/token");
const Tip = require('./common/tip/tip');
const { resolve } = require("path");

/* 定时任务引入 */
const { scheduleControl } = require('./schedule');
const { increaseVisited } = require('./common/visual')

app.use(cookieConfig); // 配置cookie
app.use(express.urlencoded({ extended: false })); // 接收post请求数据
app.use(express.json());
app.use("/source", express.static(resolve(__dirname, "public")))
app.use("/apidoc", express.static(resolve(__dirname, "apidoc")))

// 跨域配置 （本地开发、内网穿透、码云pages服务）
app.use(cors({
    origin: ['http://localhost:8080','http://leilei.vicp.io','http://codeleilei.gitee.io'],
    credentials: true
}));

// 全局拦截验证token配置
app.use("*", async(req, resp, next) => {
    increaseVisited(); // 访问量自增
    const { baseUrl } = req;
    /* 白名单过滤,登陆注册 访问静态资源等 操作不需要传递token */
    if (WHITE_LIST.includes(baseUrl) || baseUrl.startsWith('/source')) {
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
// 配置路由
app.use('/admin', adminRouter);
app.use('/article', articleRouter);
app.use('/tag', tagRouter);
app.use('/category', categoryRouter);
app.use('/alioss', aliossRouter);
app.use('/visual', visualRouter);
app.use('/permission', permissionRouter);

/* 定时任务执行 */
scheduleControl()

app.listen(3000);