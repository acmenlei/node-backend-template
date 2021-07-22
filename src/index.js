const express = require('express');
const app = express();
/* 路由 */
const adminRouter = require('./routes/admin');
const articleRouter = require('./routes/article');

const cookieConfig = require('./authentication/cookie-session');
const cors = require('cors');
const WHITE_LIST = require("./common/whiteList/list");
const { TOKEN_VERIFY } = require("./common/token/token");
const { TOKEN_IS_UNDEFINED, TOKEN_IS_EXPIRESE } = require('./common/tip/tip');
const { resolve } = require("path");

app.use(cookieConfig); // 配置cookie
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/source", express.static(resolve(__dirname, "public")))

// 跨域配置
app.use(cors({
    origin: ['http://localhost:8080'],
    credentials: true
}));

// 全局拦截验证token配置
app.use("*", async (req, resp, next) => {
    const { method, baseUrl } = req;
    // 白名单过滤,登陆注册等操作不需要传递token
    if (WHITE_LIST.includes(baseUrl)) {
        return next();
    }
    const { token } = req.headers;
    const { username } = method === 'POST' ? req.body : req.query;
    try {
        await TOKEN_VERIFY(token, username); // 验证通过
        next(); // 没有出错就是验证成功的情况
    } catch (e) {
        return e.msg === 'TokenExpiredError' ?
            resp.json({ code: -888, msg: TOKEN_IS_EXPIRESE }) : // token过期的情况
            resp.json({ code: -999, msg: TOKEN_IS_UNDEFINED }); // token错误的情况
    }
})
// 配置路由
app.use('/admin', adminRouter);
app.use('/article', articleRouter);

app.listen(3000);