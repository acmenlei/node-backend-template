#### 1. 项目介绍
blog-admin-top后台管理系统的服务端, Node编写, 配合blog-admin-top仓库食用, 详细的模块拆分

#### 2. 模块介绍
#### src/
##### authentication
鉴权模块操作

##### common
公共资源模块操作处理
- tip 提示信息定义
- token token的验证和设置
- whiteList 白名单(不做验证拦截)

##### connect
数据库链接模块

##### public
静态资源目录

##### models
数据库模型定义

##### routes
接口路由模块

##### index.js
项目入口文件

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