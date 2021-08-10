const Permission = require('./models/Permission');
const User = require('./models/User');
const FIRST = 1,
    SECOND = 2;

/**
 * 生成前端需要的权限结构
 * @param {String} permissions 
 */
async function generatePermissions(permissions) {
    let permissionConfigura = []
    permissions = permissions.split(','); // 拿到数组形式的权限列表
    for (let permission of permissions) {
        let { ll_id, ll_level, ll_pid, ll_permission_name, ll_permission_val } = await Permission.findOne({
            where: {
                ll_permission_val: permission
            }
        });
        if (ll_level == FIRST) {
            // 一级菜单权限
            permissionConfigura.push({ ll_id, ll_permission_name, ll_permission_val, ll_level, ll_pid, children: [] })
        } else {
            // 二级菜单权限
            for (let permissionItem of permissionConfigura) {
                if (permissionItem.ll_id == ll_pid) {
                    permissionItem.children.push({ ll_id, ll_permission_name, ll_permission_val, ll_level, ll_pid, })
                    break; // 找到的话跳出 没有再循环下去的必要
                }
            }
        }
    }
    return Promise.resolve(permissionConfigura)
}

async function queryPermission(ll_username) {
    try {
        const { ll_permission } = await User.findOne({ attributes: ['ll_permission'], where: { ll_username } });
        return Promise.resolve(ll_permission.split(','))
    } catch {
        return Promise.reject()
    }
}

module.exports = {
    generatePermissions,
    queryPermission,
}