#### 项目介绍
一个`nodejs`、`express`、`mysql`、`redis`、`jwt`、`session`、`crypto-js`写的后台模板，提供初学者学习，详细的模块划分
#### src/
##### authentication
鉴权模块操作

##### common
公共资源模块操作处理

##### connect
数据库链接模块

##### public
静态资源目录

##### query
处理数据库查询操作

##### routes
接口路由模块

##### sql
`sql`语句模块，所有用到的`sql`语句都在这里

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