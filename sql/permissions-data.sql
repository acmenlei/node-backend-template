/*
 Navicat Premium Data Transfer

 Source Server         : vue-blog
 Source Server Type    : MySQL
 Source Server Version : 80027
 Source Host           : localhost:3306
 Source Schema         : admin_top_blog

 Target Server Type    : MySQL
 Target Server Version : 80027
 File Encoding         : 65001

 Date: 04/02/2022 19:04:40
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for ll_permissions
-- ----------------------------
DROP TABLE IF EXISTS `ll_permissions`;
CREATE TABLE `ll_permissions` (
  `ll_id` int NOT NULL AUTO_INCREMENT,
  `ll_permission_name` varchar(20) DEFAULT NULL,
  `ll_permission_val` varchar(30) DEFAULT NULL,
  `ll_createdTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `ll_updatedTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ll_level` int NOT NULL,
  `ll_pid` int DEFAULT NULL,
  PRIMARY KEY (`ll_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of ll_permissions
-- ----------------------------
BEGIN;
INSERT INTO `ll_permissions` VALUES (1, '工作台', 'workTower', '2021-08-10 11:24:34', '2021-08-10 11:24:34', 1, NULL);
INSERT INTO `ll_permissions` VALUES (2, '创作中心', 'creativeCenter', '2021-08-10 11:36:06', '2021-08-10 11:36:09', 1, NULL);
INSERT INTO `ll_permissions` VALUES (3, '文章列表', 'articleList', '2021-08-10 11:36:11', '2021-08-12 11:13:00', 2, 2);
INSERT INTO `ll_permissions` VALUES (4, '发布文章', 'articleEdit', '2021-08-10 11:36:15', '2021-08-10 11:36:17', 2, 2);
INSERT INTO `ll_permissions` VALUES (5, '分类管理', 'categoryManage', '2021-08-10 11:36:19', '2021-08-10 11:36:20', 1, NULL);
INSERT INTO `ll_permissions` VALUES (6, '分类列表', 'categoryList', '2021-08-10 11:36:22', '2021-08-10 11:36:31', 2, 5);
INSERT INTO `ll_permissions` VALUES (7, '新增分类', 'categoryEdit', '2021-08-10 11:36:27', '2021-08-10 11:36:29', 2, 5);
INSERT INTO `ll_permissions` VALUES (8, '标签管理', 'tagManage', '2021-08-10 11:36:33', '2021-08-10 11:36:34', 1, NULL);
INSERT INTO `ll_permissions` VALUES (9, '标签列表', 'tagList', '2021-08-10 11:37:23', '2021-08-10 11:37:25', 2, 8);
INSERT INTO `ll_permissions` VALUES (10, '新增标签', 'tagEdit', '2021-08-10 11:37:27', '2021-08-10 11:37:28', 2, 8);
INSERT INTO `ll_permissions` VALUES (11, '用户管理', 'userManage', '2021-08-10 11:37:30', '2021-08-10 11:37:32', 1, NULL);
INSERT INTO `ll_permissions` VALUES (12, '用户列表', 'userList', '2021-08-10 11:37:33', '2021-08-10 11:37:35', 2, 11);
INSERT INTO `ll_permissions` VALUES (13, '新增用户', 'userEdit', '2021-08-10 11:37:38', '2021-08-10 11:37:39', 2, 11);
INSERT INTO `ll_permissions` VALUES (14, '删除文章', 'articleDelete', '2021-08-13 15:45:27', '2021-08-13 15:45:29', 2, 2);
INSERT INTO `ll_permissions` VALUES (15, '删除分类', 'categoryDelete', '2021-08-13 15:45:30', '2021-08-13 15:45:32', 2, 5);
INSERT INTO `ll_permissions` VALUES (16, '删除标签', 'tagDelete', '2021-08-13 15:45:33', '2021-08-13 15:45:35', 2, 8);
INSERT INTO `ll_permissions` VALUES (17, '删除用户', 'userDelete', '2021-08-13 15:45:36', '2021-08-13 15:45:37', 2, 11);
INSERT INTO `ll_permissions` VALUES (18, '权限分配', 'allocationPermission', '2021-08-13 16:18:08', '2021-08-13 16:18:10', 2, 11);
INSERT INTO `ll_permissions` VALUES (19, '留言板', 'commentBoard', '2022-02-02 19:53:21', '2022-02-02 19:53:21', 1, NULL);
INSERT INTO `ll_permissions` VALUES (20, '留言板列表', 'commentBoardList', '2022-02-02 19:53:48', '2022-02-02 19:53:48', 2, 19);
INSERT INTO `ll_permissions` VALUES (21, '删除留言', 'deleteCommentBoardItem', '2022-02-02 20:28:14', '2022-02-02 20:51:42', 2, 19);
INSERT INTO `ll_permissions` VALUES (22, '删除回复', 'deleteCommentBoardReplyItem', '2022-02-02 20:36:38', '2022-02-02 20:51:48', 2, 19);
INSERT INTO `ll_permissions` VALUES (23, '留言版回复列表', 'commentBoardReplyList', '2022-02-02 20:40:52', '2022-02-02 20:40:52', 2, 19);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
