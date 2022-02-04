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

 Date: 04/02/2022 14:36:39
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for ll_article
-- ----------------------------
DROP TABLE IF EXISTS `ll_article`;
CREATE TABLE `ll_article` (
  `ll_id` bigint NOT NULL,
  `ll_title` text,
  `ll_introduce` text,
  `ll_category` varchar(20) DEFAULT NULL,
  `ll_tags` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `ll_visitedCounts` bigint DEFAULT '0',
  `ll_likedCounts` bigint DEFAULT '0',
  `ll_cover` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `ll_createdTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `ll_updatedTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `ll_content` text,
  `ll_content_html` text,
  PRIMARY KEY (`ll_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Table structure for ll_article_comments
-- ----------------------------
DROP TABLE IF EXISTS `ll_article_comments`;
CREATE TABLE `ll_article_comments` (
  `ll_id` bigint NOT NULL,
  `ll_nick_name` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ll_username` varchar(11) NOT NULL,
  `ll_createdTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ll_content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ll_avatar` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `ll_level` int DEFAULT NULL,
  `ll_article_id` bigint NOT NULL,
  PRIMARY KEY (`ll_id`,`ll_username`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Table structure for ll_article_comments_reply
-- ----------------------------
DROP TABLE IF EXISTS `ll_article_comments_reply`;
CREATE TABLE `ll_article_comments_reply` (
  `ll_id` bigint NOT NULL,
  `ll_nick_name` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ll_username` varchar(11) NOT NULL,
  `ll_createdTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ll_content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ll_pid` bigint DEFAULT NULL,
  `ll_p_username` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `ll_avatar` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `ll_p_nick_name` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ll_level` int DEFAULT NULL,
  `ll_article_id` bigint NOT NULL,
  PRIMARY KEY (`ll_id`,`ll_username`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Table structure for ll_categorys
-- ----------------------------
DROP TABLE IF EXISTS `ll_categorys`;
CREATE TABLE `ll_categorys` (
  `ll_id` bigint NOT NULL,
  `ll_category_name` varchar(20) DEFAULT NULL,
  `ll_category_val` varchar(10) DEFAULT NULL,
  `ll_createdTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `ll_updatedTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ll_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Table structure for ll_comments
-- ----------------------------
DROP TABLE IF EXISTS `ll_comments`;
CREATE TABLE `ll_comments` (
  `ll_id` bigint NOT NULL,
  `ll_nick_name` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ll_username` varchar(11) NOT NULL,
  `ll_createdTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ll_content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ll_avatar` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `ll_level` int DEFAULT NULL,
  PRIMARY KEY (`ll_id`,`ll_username`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Table structure for ll_comments_reply
-- ----------------------------
DROP TABLE IF EXISTS `ll_comments_reply`;
CREATE TABLE `ll_comments_reply` (
  `ll_id` bigint NOT NULL,
  `ll_nick_name` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ll_username` varchar(11) NOT NULL,
  `ll_createdTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ll_content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ll_pid` bigint DEFAULT NULL,
  `ll_p_username` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `ll_avatar` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `ll_p_nick_name` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ll_level` int DEFAULT NULL,
  PRIMARY KEY (`ll_id`,`ll_username`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

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
-- Table structure for ll_reception_users
-- ----------------------------
DROP TABLE IF EXISTS `ll_reception_users`;
CREATE TABLE `ll_reception_users` (
  `ll_id` bigint NOT NULL,
  `ll_username` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ll_password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ll_nick_name` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '一只猪',
  `ll_avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'http://codeleilei.gitee.io/blog/default_avatar.jpeg',
  `ll_createdTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ll_updatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ll_id`,`ll_username`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Table structure for ll_tags
-- ----------------------------
DROP TABLE IF EXISTS `ll_tags`;
CREATE TABLE `ll_tags` (
  `ll_id` bigint NOT NULL,
  `ll_tag_name` varchar(20) DEFAULT NULL,
  `ll_tag_val` varchar(20) NOT NULL,
  `ll_createdTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `ll_updatedTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ll_id`),
  KEY `ll_tag_val` (`ll_tag_val`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Table structure for ll_users
-- ----------------------------
DROP TABLE IF EXISTS `ll_users`;
CREATE TABLE `ll_users` (
  `ll_id` bigint NOT NULL,
  `ll_username` varchar(11) NOT NULL,
  `ll_password` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ll_email` varchar(20) DEFAULT NULL,
  `ll_sex` char(1) DEFAULT NULL,
  `ll_createdTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `ll_updatedTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ll_permission` text,
  `ll_description` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`ll_id`,`ll_username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

SET FOREIGN_KEY_CHECKS = 1;
