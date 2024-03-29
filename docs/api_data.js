define({ "api": [
  {
    "type": "POST",
    "url": "/alioss/getToken",
    "title": "获取阿里云临时token令牌",
    "description": "<p>获取阿里云临时token令牌</p>",
    "name": "getToken",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/alioss/getToken"
      }
    ],
    "group": "Alioss",
    "version": "1.0.0",
    "filename": "src/routes/alioss.js",
    "groupTitle": "Alioss"
  },
  {
    "type": "POST",
    "url": "/article/delete",
    "title": "删除单篇文章",
    "description": "<p>根据文章ID获取单篇文章</p>",
    "name": "delete",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ll_id",
            "description": "<p>文章ID</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/article/delete"
      }
    ],
    "group": "Article",
    "version": "1.0.0",
    "filename": "src/routes/article.js",
    "groupTitle": "Article"
  },
  {
    "type": "POST",
    "url": "/article/list",
    "title": "获取文章列表",
    "description": "<p>权限验证(将token和username携带在请求头)</p>",
    "name": "list",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pageSize",
            "description": "<p>每页数据条数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pageNum",
            "description": "<p>第几页</p>"
          }
        ],
        "可选": [
          {
            "group": "可选",
            "type": "String",
            "optional": false,
            "field": "ll_category",
            "description": "<p>模糊查询类别（可选）</p>"
          },
          {
            "group": "可选",
            "type": "String",
            "optional": false,
            "field": "ll_title",
            "description": "<p>模糊查询标题（可选）</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/article/list"
      }
    ],
    "group": "Article",
    "version": "1.0.0",
    "filename": "src/routes/article.js",
    "groupTitle": "Article"
  },
  {
    "type": "POST",
    "url": "/article/publish",
    "title": "发表文章",
    "description": "<p>发表文章</p>",
    "name": "publish",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ll_title",
            "description": "<p>文章标题</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ll_introduce",
            "description": "<p>文件简介</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ll_content",
            "description": "<p>文章文本内容</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ll_content_html",
            "description": "<p>文章所生成的HTML结构</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ll_category",
            "description": "<p>文章分类</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ll_tags",
            "description": "<p>文章标签</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ll_cover",
            "description": "<p>文章封面url地址</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/article/publish"
      }
    ],
    "group": "Article",
    "version": "1.0.0",
    "filename": "src/routes/article.js",
    "groupTitle": "Article"
  },
  {
    "type": "POST",
    "url": "/article/single",
    "title": "获取单篇文章",
    "description": "<p>根据文章ID获取单篇文章</p>",
    "name": "single",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ll_id",
            "description": "<p>文章ID</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/article/single"
      }
    ],
    "group": "Article",
    "version": "1.0.0",
    "filename": "src/routes/article.js",
    "groupTitle": "Article"
  },
  {
    "type": "POST",
    "url": "/article/update",
    "title": "更新文章",
    "description": "<p>更新文章</p>",
    "name": "update",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ll_id",
            "description": "<p>文章ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ll_title",
            "description": "<p>文章标题</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ll_introduce",
            "description": "<p>文章简介</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ll_content",
            "description": "<p>文章文本内容</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ll_content_html",
            "description": "<p>文章所生成的HTML结构</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ll_category",
            "description": "<p>文章分类</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ll_tags",
            "description": "<p>文章标签</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ll_cover",
            "description": "<p>文章封面url地址</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/article/update"
      }
    ],
    "group": "Article",
    "version": "1.0.0",
    "filename": "src/routes/article.js",
    "groupTitle": "Article"
  },
  {
    "type": "POST",
    "url": "/category/delete",
    "title": "删除分类",
    "description": "<p>根据ID删除分类</p>",
    "name": "delete",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ll_id",
            "description": "<p>类别ID</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/category/delete"
      }
    ],
    "group": "Category",
    "version": "1.0.0",
    "filename": "src/routes/category.js",
    "groupTitle": "Category"
  },
  {
    "type": "GET",
    "url": "/category/getCategorys",
    "title": "获取所有分类",
    "description": "<p>获取所有分类</p>",
    "name": "getCategorys",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/category/getCategorys"
      }
    ],
    "group": "Category",
    "version": "1.0.0",
    "filename": "src/routes/category.js",
    "groupTitle": "Category"
  },
  {
    "type": "POST",
    "url": "/category/list",
    "title": "获取所有分类列表",
    "description": "<p>获取所有分类列表以及分类总条数</p>",
    "name": "list",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pageNum",
            "description": "<p>第几页</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pageSize",
            "description": "<p>每页多少条数据</p>"
          }
        ],
        "可选": [
          {
            "group": "可选",
            "type": "Number",
            "optional": false,
            "field": "ll_id",
            "description": "<p>类别ID</p>"
          },
          {
            "group": "可选",
            "type": "String",
            "optional": false,
            "field": "ll_category_name",
            "description": "<p>类别名称</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/category/list"
      }
    ],
    "group": "Category",
    "version": "1.0.0",
    "filename": "src/routes/category.js",
    "groupTitle": "Category"
  },
  {
    "type": "POST",
    "url": "/category/publish",
    "title": "新增分类",
    "description": "<p>新增分类</p>",
    "name": "publish",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ll_category_val",
            "description": "<p>类别Code值</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ll_category_name",
            "description": "<p>类别名称</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/category/publish"
      }
    ],
    "group": "Category",
    "version": "1.0.0",
    "filename": "src/routes/category.js",
    "groupTitle": "Category"
  },
  {
    "type": "POST",
    "url": "/category/single",
    "title": "获取分类",
    "description": "<p>根据ID获取分类</p>",
    "name": "single",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ll_id",
            "description": "<p>类别ID</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/category/single"
      }
    ],
    "group": "Category",
    "version": "1.0.0",
    "filename": "src/routes/category.js",
    "groupTitle": "Category"
  },
  {
    "type": "POST",
    "url": "/category/update",
    "title": "更新分类",
    "description": "<p>更新分类</p>",
    "name": "update",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ll_category_val",
            "description": "<p>类别Code值</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ll_category_name",
            "description": "<p>类别名称</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/category/update"
      }
    ],
    "group": "Category",
    "version": "1.0.0",
    "filename": "src/routes/category.js",
    "groupTitle": "Category"
  },
  {
    "type": "GET",
    "url": "/permission/queryAllPermissions",
    "title": "查询所有权限码",
    "description": "<p>查询所有权限码</p>",
    "name": "queryAllPermissions",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/permission/queryAllPermissions"
      }
    ],
    "group": "Permission",
    "version": "1.0.0",
    "filename": "src/routes/permission.js",
    "groupTitle": "Permission"
  },
  {
    "type": "POST",
    "url": "/tag/delete",
    "title": "删除标签",
    "description": "<p>根据ID删除标签</p>",
    "name": "delete",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ll_id",
            "description": "<p>标签ID</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/tag/delete"
      }
    ],
    "group": "Tag",
    "version": "1.0.0",
    "filename": "src/routes/tag.js",
    "groupTitle": "Tag"
  },
  {
    "type": "GET",
    "url": "/tag/getTags",
    "title": "获取所有标签",
    "description": "<p>获取所有标签</p>",
    "name": "getTags",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/tag/getTags"
      }
    ],
    "group": "Tag",
    "version": "1.0.0",
    "filename": "src/routes/tag.js",
    "groupTitle": "Tag"
  },
  {
    "type": "POST",
    "url": "/tag/list",
    "title": "获取标签列表",
    "description": "<p>获取所有标签列表以及总条数</p>",
    "name": "list",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pageNum",
            "description": "<p>第几页</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pageSize",
            "description": "<p>每页多少条数据</p>"
          }
        ],
        "可选": [
          {
            "group": "可选",
            "type": "Number",
            "optional": false,
            "field": "ll_id",
            "description": "<p>标签ID</p>"
          },
          {
            "group": "可选",
            "type": "String",
            "optional": false,
            "field": "ll_tag_name",
            "description": "<p>标签名</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/tag/list"
      }
    ],
    "group": "Tag",
    "version": "1.0.0",
    "filename": "src/routes/tag.js",
    "groupTitle": "Tag"
  },
  {
    "type": "POST",
    "url": "/tag/publish",
    "title": "新增标签",
    "description": "<p>新增标签</p>",
    "name": "publish",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ll_tag_val",
            "description": "<p>标签Code值</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ll_tag_name",
            "description": "<p>标签名称</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/tag/publish"
      }
    ],
    "group": "Tag",
    "version": "1.0.0",
    "filename": "src/routes/tag.js",
    "groupTitle": "Tag"
  },
  {
    "type": "POST",
    "url": "/tag/single",
    "title": "获取标签",
    "description": "<p>根据ID获取标签</p>",
    "name": "single",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ll_id",
            "description": "<p>标签ID</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/tag/single"
      }
    ],
    "group": "Tag",
    "version": "1.0.0",
    "filename": "src/routes/tag.js",
    "groupTitle": "Tag"
  },
  {
    "type": "POST",
    "url": "/tag/update",
    "title": "更新标签",
    "description": "<p>更新标签</p>",
    "name": "update",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ll_tag_val",
            "description": "<p>标签Code值</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ll_tag_name",
            "description": "<p>标签名称</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/tag/update"
      }
    ],
    "group": "Tag",
    "version": "1.0.0",
    "filename": "src/routes/tag.js",
    "groupTitle": "Tag"
  },
  {
    "type": "POST",
    "url": "/permission/allocationPermissions",
    "title": "分配用户可用权限",
    "description": "<p>分配用户可用权限</p>",
    "name": "allocationPermissions",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ll_id",
            "description": "<p>用户ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ll_permission",
            "description": "<p>分配给用户的权限 以逗号分隔</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/permission/allocationPermissions"
      }
    ],
    "group": "User",
    "version": "1.0.0",
    "filename": "src/routes/permission.js",
    "groupTitle": "User"
  },
  {
    "type": "POST",
    "url": "/admin/delete",
    "title": "根据id删除用户",
    "description": "<p>根据id删除用户</p>",
    "name": "delete",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ll_id",
            "description": "<p>用户ID</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/admin/delete"
      }
    ],
    "group": "User",
    "version": "1.0.0",
    "filename": "src/routes/admin.js",
    "groupTitle": "User"
  },
  {
    "type": "POST",
    "url": "/admin/login",
    "title": "登陆后台",
    "description": "<p>登陆后台</p>",
    "name": "login",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ll_username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ll_password",
            "description": "<p>密码</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/admin/login"
      }
    ],
    "group": "User",
    "version": "1.0.0",
    "filename": "src/routes/admin.js",
    "groupTitle": "User"
  },
  {
    "type": "POST",
    "url": "/admin/loginout",
    "title": "退出登录/注销",
    "description": "<p>退出登录/注销</p>",
    "name": "loginout",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ll_username",
            "description": "<p>用户名</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/admin/loginout"
      }
    ],
    "group": "User",
    "version": "1.0.0",
    "filename": "src/routes/admin.js",
    "groupTitle": "User"
  },
  {
    "type": "POST",
    "url": "/permission/queryPermissions",
    "title": "获得某个用户",
    "description": "<p>通过用户名查询登录用户的所有权限</p>",
    "name": "queryPermissions",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ll_username",
            "description": "<p>用户名</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/permission/queryPermissions"
      }
    ],
    "group": "User",
    "version": "1.0.0",
    "filename": "src/routes/permission.js",
    "groupTitle": "User"
  },
  {
    "type": "POST",
    "url": "/permission/queryUserById",
    "title": "查询用户权限",
    "description": "<p>通过用户ID查询用户权限</p>",
    "name": "queryUserById",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ll_id",
            "description": "<p>用户ID</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/permission/queryUserById"
      }
    ],
    "group": "User",
    "version": "1.0.0",
    "filename": "src/routes/permission.js",
    "groupTitle": "User"
  },
  {
    "type": "POST",
    "url": "/permission/queryUserPermissionList",
    "title": "查询用户列表",
    "description": "<p>查询用户列表 以及权限列表</p>",
    "name": "queryUserPermissionList",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pageNum",
            "description": "<p>第几页</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pageSize",
            "description": "<p>每页多少条数据</p>"
          }
        ],
        "可选": [
          {
            "group": "可选",
            "type": "Number",
            "optional": false,
            "field": "ll_id",
            "description": "<p>用户ID</p>"
          },
          {
            "group": "可选",
            "type": "String",
            "optional": false,
            "field": "ll_username",
            "description": "<p>用户名</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/permission/queryUserPermissionList"
      }
    ],
    "group": "User",
    "version": "1.0.0",
    "filename": "src/routes/permission.js",
    "groupTitle": "User"
  },
  {
    "type": "POST",
    "url": "/admin/register",
    "title": "注册角色",
    "description": "<p>注册角色</p>",
    "name": "register",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ll_username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ll_password",
            "description": "<p>密码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ll_description",
            "description": "<p>描述信息</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ll_email",
            "description": "<p>用户邮箱</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ll_permission",
            "description": "<p>用户权限 以逗号分隔</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/admin/register"
      }
    ],
    "group": "User",
    "version": "1.0.0",
    "filename": "src/routes/admin.js",
    "groupTitle": "User"
  },
  {
    "type": "POST",
    "url": "/admin/single",
    "title": "根据id查用户",
    "description": "<p>根据id查用户</p>",
    "name": "single",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ll_id",
            "description": "<p>用户ID</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/admin/single"
      }
    ],
    "group": "User",
    "version": "1.0.0",
    "filename": "src/routes/admin.js",
    "groupTitle": "User"
  },
  {
    "type": "POST",
    "url": "/admin/update",
    "title": "更新用户信息",
    "description": "<p>更新用户信息</p>",
    "name": "update",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ll_id",
            "description": "<p>用户ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ll_username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ll_password",
            "description": "<p>密码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ll_description",
            "description": "<p>用户描述信息</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ll_permission",
            "description": "<p>用户权限 以逗号分隔</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/admin/update"
      }
    ],
    "group": "User",
    "version": "1.0.0",
    "filename": "src/routes/admin.js",
    "groupTitle": "User"
  },
  {
    "type": "POST",
    "url": "/admin/verify",
    "title": "权限验证",
    "description": "<p>权限验证(将token和username携带在请求头)</p>",
    "name": "verify",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "routeCode",
            "description": "<p>路由Code码 前端路由配置项中的Code</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/admin/verify"
      }
    ],
    "group": "User",
    "version": "1.0.0",
    "filename": "src/routes/admin.js",
    "groupTitle": "User"
  },
  {
    "type": "GET",
    "url": "/visual/queryCategoryGroup",
    "title": "文章分类",
    "description": "<p>获取文章分类 分组</p>",
    "name": "queryCategoryGroup",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/visual/queryCategoryGroup"
      }
    ],
    "group": "Visual",
    "version": "1.0.0",
    "filename": "src/routes/visual.js",
    "groupTitle": "Visual"
  },
  {
    "type": "POST",
    "url": "/visual/queryVisitedBythirtyDay",
    "title": "近30日网站数据",
    "description": "<p>获取网站近30日访问量以及发布文章数量</p>",
    "name": "queryVisitedBythirtyDay",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "startTime",
            "description": "<p>从第几个索引位置开始取</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "endTime",
            "description": "<p>到第几个索引位置结束</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/visual/queryVisitedBythirtyDay"
      }
    ],
    "group": "Visual",
    "version": "1.0.0",
    "filename": "src/routes/visual.js",
    "groupTitle": "Visual"
  }
] });
