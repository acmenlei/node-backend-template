/* 后台状态统一管理 */
const TOKEN_IS_UNDEFINED = '请携带有效的Token!';
const TOKEN_IS_EXPIRESE = '登录信息已过期，请重新登陆后操作!';
const REGISTER_FAILURE = '账户信息注册失败!';
const REGISTER_IS_EXISTS = '注册账户已经存在请重新注册!';
const REGISTER_OK = '注册成功!';
const LOGIN_OUT = '退出登陆成功!';
const NETWORK_ERROR = '网络出错!';
const LOGIN_OK = '登陆成功!';
const LOGIN_FAILED = '登陆失败, 密码错误!';
const USERNAME_IS_NULL = '登陆账户不存在!';
const SEARCH_OK = '查询成功';
const SEARCH_ERROR = '查询失败';
const ARTICLE_PUBLISH_SUCCESS = '文章发布成功';

module.exports = {
    TOKEN_IS_UNDEFINED,
    TOKEN_IS_EXPIRESE,
    REGISTER_FAILURE,
    REGISTER_OK,
    LOGIN_OUT,
    NETWORK_ERROR,
    LOGIN_OK,
    LOGIN_FAILED,
    USERNAME_IS_NULL,
    REGISTER_IS_EXISTS,
    SEARCH_OK,
    SEARCH_ERROR,
    ARTICLE_PUBLISH_SUCCESS
}