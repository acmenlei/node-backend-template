#### 1. 项目介绍
`blog-admin-top`后台管理系统的服务端, `Node`编写, 需要配合`blog-admin-top`项目食用, 算是比较详细的模块拆分, 带权限处理+数据中台, 可以学习练手。
`MySQL`+`Redis`做数据存储, `jwt`+`crypto-js`做用户登录校验

#### 2. 模块介绍
- 鉴权模块(jwt&crypto-js&cookie&session): `src/authentication`
- 公共逻辑处理(定时任务schedule+tip+alioss+令牌校验): `src/common`
- 数据库连接(MySQL&Redis): `src/connect`
- 数据库模型: `src/models`
- 路由接口: `src/routes`
- 入口文件: `src/index`
- 权限相关逻辑处理: `src/permission`

#### 配置跨域
在入口文件(index.js)中,找到以下内容
```js
app.use(cors({
    origin: 'http://localhost:3001', // 此处为你的前端地址，值可以是string | Array<string>
    credentials: true // 允许跨域携带cookie
})) // 跨域
```

#### 2. 启动

#### 安装依赖
```shell
yarn 或者 npm install
```
#### 启动
##### 普通命令启动
```shell
node ./src/index.js
```
##### 热更新启动
```shell
nodemon ./src/index.js
```
ps：没有安装nodemon需要安装一下
```shell
npm install nodemon -g
```