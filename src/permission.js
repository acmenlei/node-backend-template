const Permission = require('./models/Permission');
const User = require('./models/User');
const FIRST = 1,
    SECOND = 2;

/**
 * 生成前端需要的权限结构( 分两步：先处理一级菜单 再处理二级菜单 如果有三级也是同理 )
 * @param {String} permissions 
 */
async function generatePermissions(permissions) {
    let permissionConfigura = [], permissionLeveltwo = [];
    permissions = permissions.split(','); // 拿到数组形式的权限列表
    for (let permission of permissions) {
        let {
            ll_id,
            ll_level,
            ll_pid,
            ll_permission_name,
            ll_permission_val
        } = await Permission.findOne({
            where: {
                ll_permission_val: permission
            }
        });
        if(ll_level == FIRST) {
            permissionConfigura.push({ ll_id, ll_permission_name, ll_permission_val, ll_level, ll_pid, ll_children: [] })
        } else {
            // 2级菜单
            permissionLeveltwo.push({ ll_id, ll_permission_name, ll_permission_val, ll_level, ll_pid})
        }
    }
    // 一级菜单存储完毕 轮到二级菜单 从一级菜单中找到二级菜单所对应的一级菜单
    for (let permission of permissionLeveltwo) {
        for (let permissionItem of permissionConfigura) {
            if (permissionItem.ll_id == permission.ll_pid) {
                permissionItem.ll_children.push(permission)
                break; // 找到的话跳出 没有再循环下去的必要
            }
        }
    }
    return Promise.resolve(permissionConfigura)
}

async function queryPermission(ll_username) {
    try {
        const {
            ll_permission
        } = await User.findOne({
            attributes: ['ll_permission'],
            where: {
                ll_username
            }
        });
        return Promise.resolve(ll_permission.split(','))
    } catch {
        return Promise.reject()
    }
}

/**
 * 查询所有权限code码 生成前端需要的权限数据结构形式
 * @param {Array<String>} permissionList 
 * @returns 
 */
function generatorAllPermissions(permissionList) {
    let permissionConfigura = [], permissionLeveltwo = [];
    /* 1. 处理一级路由先 */
    for (let permission of permissionList) {
        if(permission.ll_level == FIRST) {
            // 一级菜单只需要这些属性
            let { ll_id, ll_permission_name, ll_permission_val } = permission;
            let levelOne = { ll_id, ll_permission_name, ll_permission_val, ll_children: [] }
            permissionConfigura.push(levelOne);
        } else {
            permissionLeveltwo.push(permission);
        }
    }
    /* 处理二级路由 */
    for (let permission of permissionLeveltwo) {
        for (let permissionOne of permissionConfigura ) {
            if (permissionOne.ll_id == permission.ll_pid) {
                permissionOne.ll_children.push(permission);
                break;
            }
        }
    }
    return Promise.resolve(permissionConfigura)
}

module.exports = {
    generatePermissions,
    queryPermission,
    generatorAllPermissions
}