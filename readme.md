#### 1. 项目介绍
`vue-admin-top`后台管理系统和`next-ts-blog-site`的服务端, `Node`编写, 需要配合那两个项目食用, 算是比较详细的模块拆分, 带权限处理+数据中台, 可以学习练手。
`MySQL`+`Redis`做数据存储, `jwt`+`crypto-js`做用户登录校验

> Api文档查看请在服务启动后访问http://localhost:9001/docs

#### 2. 模块介绍
- Api文档: `/docs`
- 鉴权模块(jwt&crypto-js&cookie&session): `src/authentication`
- 公共逻辑处理(tip/alioss/可视化数据处理): `src/common`
- 拦截器逻辑处理: `src/intercepter`
- 定时任务: `src/schedule`
- 公共逻辑处理(tip/alioss/可视化数据处理): `src/common`
- 过滤拦截器白名单: `src/whiteList`
- 数据库模型: `src/models`
- 管理系统路由接口: `src/routes`
- 前端路由接口: `src/receptionRoutes`
- 入口文件: `src/index`
- 权限相关逻辑处理: `src/permission`

#### 配置跨域
在入口文件(`index.js`)中,找到以下内容
```js
app.use(cors({
    origin: 'http://localhost:8080', // 此处为你的前端地址，值可以是string | Array<string>
    credentials: true // 允许跨域携带cookie
})) // 跨域
```

#### 2. 启动

#### 安装依赖
```shell
yarn 或者 npm install
```
#### 启动
```shell
npm start
```

## 项目启动说明（请先阅读）
1. 项目依赖`redis`，启动项目请先去启动`redis`，否则报错
2. 数据库结构在`/sql`文件夹下面
3. `/src/common/alioss/config.js`文件是阿里云存储的配置选项,涉及私密信息这里我就不上传了，我把它的内容列出来，大家可以自己去阿里云文档查询对应的配置属性
```js
module.exports = {
    region: "",
    accessKeyId: "",
    accessKeySecret: "",
    bucket: "",
    Action:"",
    roleArn: "",
    policy: JSON.stringify({
        "Version": "1",
        "Statement": [
            {
                "Effect": "",
                "Action": "",
                "Resource": [
                    
                ]
            }
        ]
    }),
    RoleSessionName:""
}
```