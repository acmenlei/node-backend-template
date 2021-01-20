const SELECT_STUDENTINFO = 'SELECT * FROM student'; // 查询学生信息
const INSERT_STUDENTINFO = 'INSERT INTO student(username, pass_word) VALUES(?,?)'; // 插入用户信息
const SELECT_PASSWORD = 'SELECT pass_word FROM student WHERE username = ?'; // 登陆操作

module.exports = {
    SELECT_STUDENTINFO,
    INSERT_STUDENTINFO,
    SELECT_PASSWORD
}