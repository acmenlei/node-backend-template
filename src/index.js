const express = require('express');
const app = express();
const studentRouter = require('./routes/student');
const cookieConfig = require('./authentication/cookie-session');
const cors = require('cors');
const WHITE_LIST = require("./common/whiteList/list");
const { TOKEN_VERIFY } = require("./common/token/token");
const { TOKEN_IS_UNDEFINED } = require('./common/tip/tip');

app.use(cookieConfig); // 配置cookie
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// 跨域配置
app.use(cors({
    origin: 'http://localhost:3001',
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
    const result = await TOKEN_VERIFY(token, username); // 验证通过
    if (result) {
        return resp.json({ code: -99, msg: TOKEN_IS_UNDEFINED });
    }
    next();
})
// 配置路由
app.use('/student', studentRouter);

app.listen(3000);