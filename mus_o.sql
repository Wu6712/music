/*
 Navicat Premium Data Transfer

 Source Server         : MySQL80
 Source Server Type    : MySQL
 Source Server Version : 80032
 Source Host           : localhost:3306
 Source Schema         : mus_o

 Target Server Type    : MySQL
 Target Server Version : 80032
 File Encoding         : 65001

 Date: 11/09/2023 19:42:20
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for banner
-- ----------------------------
DROP TABLE IF EXISTS `banner`;
CREATE TABLE `banner`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `link` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of banner
-- ----------------------------
INSERT INTO `banner` VALUES (1, 'banner.jpg', 'http://localhost:8080/api/banner/picSrc/banner.jpg');
INSERT INTO `banner` VALUES (2, 'banner1.jpg', 'http://localhost:8080/api/banner/picSrc/banner1.jpg');
INSERT INTO `banner` VALUES (3, 'banner2.jpg', 'http://localhost:8080/api/banner/picSrc/banner2.jpg');
INSERT INTO `banner` VALUES (4, 'banner3.jpg', 'http://localhost:8080/api/banner/picSrc/banner3.jpg');

-- ----------------------------
-- Table structure for music
-- ----------------------------
DROP TABLE IF EXISTS `music`;
CREATE TABLE `music`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `link` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `type` int(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of music
-- ----------------------------
INSERT INTO `music` VALUES (1, 'http://localhost:8080/api/music/musicSrc/星月神话.mp3', '星月神话.mp3', 0);
INSERT INTO `music` VALUES (2, 'http://localhost:8080/api/music/musicSrc/半壶纱.mp3', '半壶纱.mp3', 1);
INSERT INTO `music` VALUES (3, 'http://localhost:8080/api/music/musicSrc/96猫 - WAVE.mp3', '96猫 - WAVE.mp3', 2);
INSERT INTO `music` VALUES (4, 'http://localhost:8080/api/music/musicSrc/若雨 - 醉千年.mp3', '若雨 - 醉千年.mp3', 1);
INSERT INTO `music` VALUES (5, 'http://localhost:8080/api/music/musicSrc/Akie秋绘 - Lemon（翻自 米津玄師）.mp3', 'Akie秋绘 - Lemon（翻自 米津玄師）.mp3', 2);
INSERT INTO `music` VALUES (6, 'http://localhost:8080/api/music/musicSrc/Akie秋绘 - Pray.mp3', 'Akie秋绘 - Pray.mp3', 2);
INSERT INTO `music` VALUES (7, 'http://localhost:8080/api/music/musicSrc/漂洋过海来看你english.mp3', '漂洋过海来看你english.mp3', 1);
INSERT INTO `music` VALUES (8, 'http://localhost:8080/api/music/musicSrc/梦迪吖 - 醉千年（DJ热播版）.mp3', '梦迪吖 - 醉千年（DJ热播版）.mp3', 3);
INSERT INTO `music` VALUES (9, 'http://localhost:8080/api/music/musicSrc/Stack - 酔恋花 -suirenka-.mp3', 'Stack - 酔恋花 -suirenka-.mp3', 0);
INSERT INTO `music` VALUES (10, 'http://localhost:8080/api/music/musicSrc/seven oops - オレンジ.mp3', 'seven oops - オレンジ.mp3', 0);
INSERT INTO `music` VALUES (11, 'http://localhost:8080/api/music/musicSrc/顾依辰 - 海海海 (钢琴版).mp3', '顾依辰 - 海海海 (钢琴版).mp3', 1);
INSERT INTO `music` VALUES (14, 'http://localhost:8080/api/music/musicSrc/a.mp3', 'a.mp3', 0);

-- ----------------------------
-- Table structure for news
-- ----------------------------
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `content` varchar(1024) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `link` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of news
-- ----------------------------
INSERT INTO `news` VALUES (1, '林嘉欣发文宣布与袁剑伟离婚 将继续共同抚养孩子', '新浪娱乐讯 7月28日凌晨，香港媒体爆出金马影后林嘉欣与丈夫袁剑伟因性格不合及管教女儿方式发生矛盾，加之涉及金钱纠纷，现已分居消息。随后，林嘉欣与袁剑伟联名发文承认离婚，文中称：“在经过12年的婚姻生活后，我们无奈地认定我们的婚姻关系已经走到了尽头。我们曾共同努力去面对这个变化。我们过去、现在、并且将来永远都是一家人。我们首要的身份是父母，照顾两个孩子。我们将继续共同抚养孩子们。对于彼此的未来，我们真挚的希望一切都好。”', 'http://localhost:8080/api/news/picSrc/news1.jpg');
INSERT INTO `news` VALUES (2, '杨洋发文告别宋焰:谢谢大家的包容陪伴与批评建议', '新浪娱乐讯 《我的人间烟火》今日会员收官，杨洋发文告别角色宋焰：“再见了宋焰，再见了十里台的夕阳，谢谢大家这个夏天的包容与陪伴、批评和建议，我们下次见。 ”', 'http://localhost:8080/api/news/picSrc/news2.jpg');
INSERT INTO `news` VALUES (3, '神仙友谊！佘诗曼连续13年晒合照为欧阳震华庆生', '新浪娱乐讯 7月28日，佘诗曼晒合照为欧阳震华庆生，她写道：“愿所有一切美好都如期而至，生日快乐！”\r\n\r\n　　据悉，这是佘诗曼连续13年为欧阳震华庆生。两人曾搭档主演多部TVB剧集，包括《洗冤录2》《法证先锋2》《带刀女捕快》等', 'http://localhost:8080/api/news/picSrc/news3.jpg');
INSERT INTO `news` VALUES (4, '木子洋承认恋情：刚刚在一起 还在进一步相处', '新浪娱乐讯 27日，有八卦媒体拍到木子洋和一女生牵手约会，还同回小区，疑似恋情曝光。刚刚，木子洋发文承认恋情：“认真回应一下，刚刚在一起，还在进一步相处，不是回家是回校。”他还表示自己是直的 ，网传的女孩都不是女方。', 'http://localhost:8080/api/news/picSrc/news4.jpg');

-- ----------------------------
-- Table structure for playlist
-- ----------------------------
DROP TABLE IF EXISTS `playlist`;
CREATE TABLE `playlist`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `link` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of playlist
-- ----------------------------
INSERT INTO `playlist` VALUES (1, '古典', '');
INSERT INTO `playlist` VALUES (2, '流行', '');
INSERT INTO `playlist` VALUES (3, '古风', '');
INSERT INTO `playlist` VALUES (4, '说唱', '');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `sex` int(0) NULL DEFAULT 0,
  `nickname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `signature` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'admin', '123455', 'http://localhost:8080/api/user/picSrc/屏幕截图 2023-03-07 105048.png', NULL, NULL, NULL);
INSERT INTO `user` VALUES (2, 'guest', '123456', 'http://localhost:8080/api/user/picSrc/屏幕截图 2023-03-07 105048.png', NULL, NULL, NULL);
INSERT INTO `user` VALUES (3, 'test01', '123789', 'http://localhost:8080/api/user/picSrc/å±å¹æªå¾ 2023-03-07 105008.png', NULL, NULL, NULL);
INSERT INTO `user` VALUES (4, 'test04', '123456', NULL, 1, '哈哈哈', '哈哈哈哈哈哈哈');
INSERT INTO `user` VALUES (10, 'test04', '$2a$10$cJcyWIlYCHERpsU2QBfrgu.Uxlq0pVV85yIMEvRBEnDVzu21Yn3H6', NULL, NULL, NULL, NULL);
INSERT INTO `user` VALUES (11, 'test05', '123456', NULL, NULL, NULL, NULL);
INSERT INTO `user` VALUES (12, 'test09', '$2a$10$FlApx7kUUm2L9OpNguYp8OxwUagoAe0vlCO..OpipUG8G8MyNsvWC', NULL, NULL, NULL, NULL);
INSERT INTO `user` VALUES (13, 'test10', '$2a$10$yFVNBKI63HhgrNsGGWY6UeV/IQOwGrgNtAqYtAdhwHW15XrkQ4tqK', NULL, NULL, NULL, NULL);
INSERT INTO `user` VALUES (14, 'test11', '$2a$10$lOQ/9RYKMIKyRoqyFO5ur.roZG/NcpiaqDdJEbQSoTbgxhfvnNJ/e', NULL, NULL, NULL, NULL);
INSERT INTO `user` VALUES (15, 'test12', '$2a$10$NCAOqGiBY0mUeX36ysOUqegHIm9C3e45wosQME7AYLEz/RDyaZ8DG', NULL, NULL, NULL, NULL);
INSERT INTO `user` VALUES (16, 'test13', '$2a$10$k5o8MGC8erDQijQXsgQJWO2mvSKZKOK6E.Tkjmu/LVfvA47J2wY72', NULL, NULL, NULL, NULL);
INSERT INTO `user` VALUES (17, 'test14', '$2a$10$Dp7A9Xsn/VAbrfC/3dQMBuuyS0FEcAsGgUfUtCLJKhs/nBPr.9eKa', 'http://localhost:8080/api/user/picSrc/å±å¹æªå¾ 2023-03-16 093116.png', NULL, NULL, NULL);
INSERT INTO `user` VALUES (18, 'test15', '123456789', NULL, NULL, NULL, NULL);
INSERT INTO `user` VALUES (19, 'test19', '123456', NULL, NULL, NULL, NULL);
INSERT INTO `user` VALUES (20, 'test20', '123456', 'http://localhost:8080/api/user/picSrc/å±å¹æªå¾ 2023-03-07 111414.png', NULL, NULL, NULL);
INSERT INTO `user` VALUES (21, 'test21', '123123', NULL, NULL, NULL, NULL);
INSERT INTO `user` VALUES (22, 'test22', '123456', NULL, NULL, NULL, NULL);
INSERT INTO `user` VALUES (24, 'aaaaa', '$2a$10$XLhhyoxc6wQI22O6f4vai.s32OQ/qxCRsRE3QTIBffqvEW8a2YY6y', 'http://localhost:8080/api/user/picSrc/屏幕截图 2023-03-07 105048.png', 0, '123123', '11111');

SET FOREIGN_KEY_CHECKS = 1;
