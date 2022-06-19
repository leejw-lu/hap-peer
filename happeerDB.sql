-- 사용자 테이블
CREATE TABLE `user` (
  `user_id` varchar(45) NOT NULL,
  `user_password` varchar(75) NOT NULL,
  `user_nickname` varchar(45) NOT NULL,
  `user_info` varchar(500) DEFAULT NULL,
  `user_stack` varchar(500) DEFAULT NULL,
  `user_image` varchar(500) DEFAULT NULL,
  `user_stacketc` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `iduser_UNIQUE` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 프로젝트 테이블
CREATE TABLE `project` (
  `proj_id` int NOT NULL AUTO_INCREMENT,
  `proj_leader` varchar(45) NOT NULL,
  `proj_title` varchar(45) NOT NULL,
  `proj_content` varchar(500) NOT NULL,
  `proj_level` int NOT NULL,
  `proj_stack` varchar(500) DEFAULT '',
  `proj_date` datetime NOT NULL,
  `recruit_status` tinyint(1) NOT NULL DEFAULT '0',
  `develop_status` tinyint(1) NOT NULL DEFAULT '0',
  `proj_stacketc` varchar(45) DEFAULT '',
  PRIMARY KEY (`proj_id`),
  KEY `timjang_idx` (`proj_leader`),
  CONSTRAINT `timjang` FOREIGN KEY (`proj_leader`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9981 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 쪽지 테이블
CREATE TABLE `message` (
  `m_id` int NOT NULL AUTO_INCREMENT,
  `m_sender` varchar(45) NOT NULL,
  `m_receiver` varchar(45) NOT NULL,
  `m_type` varchar(20) NOT NULL DEFAULT 'default',
  `m_content` varchar(500) NOT NULL,
  `m_date` datetime NOT NULL,
  `delete_sender` tinyint(1) NOT NULL DEFAULT '0',
  `delete_receiver` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`m_id`),
  KEY `m_sender_idx` (`m_sender`),
  KEY `m_receiver_idx` (`m_receiver`),
  CONSTRAINT `m_receiver` FOREIGN KEY (`m_receiver`) REFERENCES `user` (`user_id`),
  CONSTRAINT `m_sender` FOREIGN KEY (`m_sender`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 스크랩 테이블
CREATE TABLE `scrap` (
  `sc_user` varchar(45) NOT NULL,
  `sc_project` int NOT NULL,
  `sc_id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`sc_id`),
  KEY `sc_user_idx` (`sc_user`),
  KEY `sc_project_idx` (`sc_project`),
  CONSTRAINT `sc_project` FOREIGN KEY (`sc_project`) REFERENCES `project` (`proj_id`),
  CONSTRAINT `sc_user` FOREIGN KEY (`sc_user`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1325635 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 참여 테이블
CREATE TABLE `participate` (
  `part_id` int NOT NULL AUTO_INCREMENT,
  `part_user` varchar(45) NOT NULL,
  `part_project` int NOT NULL,
  PRIMARY KEY (`part_id`),
  KEY `part_user_idx` (`part_user`),
  KEY `part_project_idx` (`part_project`),
  CONSTRAINT `part_project` FOREIGN KEY (`part_project`) REFERENCES `project` (`proj_id`),
  CONSTRAINT `part_user` FOREIGN KEY (`part_user`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 평가 테이블
CREATE TABLE `evaluation` (
  `ev_project` int NOT NULL,
  `ev_rater` varchar(45) NOT NULL,
  `ev_rated` varchar(45) NOT NULL,
  `ev_value1` int NOT NULL DEFAULT '0',
  `ev_value2` int NOT NULL DEFAULT '0',
  `ev_value3` int NOT NULL DEFAULT '0',
  `ev_value4` int NOT NULL DEFAULT '0',
  `ev_value5` int NOT NULL DEFAULT '0',
  `ev_evaluated` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ev_project`,`ev_rater`,`ev_rated`),
  KEY `ev_rater_idx` (`ev_rater`),
  KEY `ev_rated_idx` (`ev_rated`),
  CONSTRAINT `ev_project` FOREIGN KEY (`ev_project`) REFERENCES `project` (`proj_id`),
  CONSTRAINT `ev_rated` FOREIGN KEY (`ev_rated`) REFERENCES `user` (`user_id`),
  CONSTRAINT `ev_rater` FOREIGN KEY (`ev_rater`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- user data
INSERT INTO user VALUES("jiwoo","$2b$05$OpP27FBi1EcIzFK3aqpwyerG4TRtkS6qOcGsr5SBKNfQ9NTS3ONIG","지우닉넴","성신여대 컴퓨터공학과 재학중인 20학번 이지우입니다!\n현재 백엔드에 관심이 있어 nodejs를 배우고 있는 중입니다.\n프로젝트 열심히 참여할 수 있습니다!!!"," C++  JAVA ", "/uploads/1653823815970.png", "ejs, nodejs");
INSERT INTO user VALUES("sehyeon","$2b$05$9PW8E0nOfkBMd7S4LZROhO3VmHJeVQqdQL3mVvTCb9pzr93FlBIfO","ash","Where does it come from? Contrary to popular belief, Lorem Ipsum is not simply random text. "," C  C++  ", "/public/images/default_user_image.png", "nodejs");
INSERT INTO user VALUES("juyeon","$2b$05$izrrT/d6AiHsQn.CoAgY6ueWfxbsjdltg..gD.AYHX53AJb7L6ASW","이주연","안녕하세요 저는 이주연입니다. 웹 개발과 게임 개발에 관심이 많습니다. 아직 학부생이라 부족한 점이 많지만 잘 부탁드려요! ","C++  JAVA  JS  HTML ", "/public/images/default_user_image.png", "Kotlin");
INSERT INTO user VALUES("ksh","$2b$05$FXote1TX0XJ4sKHgrjqhPOjb.0soAF.CctQ.6TaOr7Cnrs9Q6HQWG","김승현","성신여자대학교 컴퓨터공학과 재학중입니다. 프로젝트 관심 있으시면 쪽지 주세요!","C  C++  JAVA  Python  JS  SQL ", "/public/images/default_user_image.png", "");
INSERT INTO user VALUES("kss1936","$2b$05$wfEMKsoTHtqbpIq3P0RyX.wtwNOZOmIiorAMWX0eb3ckS.NC7EhuW","김성신","안녕하세요 김성신 입니다!! 현재 프론트 엔드에 관심있어요!"," C  Python  JS  HTML ", "/public/images/default_user_image.png", "React");
INSERT INTO user(user_id,user_password,user_nickname,user_image) VALUES("aaa","$2b$05$uB0JccHeKipjOZVqseT/cOTsxHB0JkDvBWv6d3UGZ/rrQxd6gXY76","aaa닉네임","/public/images/default_user_image.png");
INSERT INTO user(user_id,user_password,user_nickname,user_image) VALUES("psrrr","$2b$05$DsWzF3mqmwbkHs/E5uS2fezUC/3Yjl1Zp.pcBGA1UePM2GvgAzKwu","박수룡","/public/images/default_user_image.png");

-- project data
INSERT INTO project VALUES (1, 'jiwoo', 'No.1 트레이너를 위한 1등 PT 관리 앱', 'No.1 트레이너를 위한 PT 관리 앱을 만드는 헬린캠프의 이지우입니다.\n저희 팀은 No.1 헬스 트레이너들을 위한 PT 관리 SaaS, 헬린캠프를 운영하고 있으며\n최근 국내 스타트업 엑셀레이터 프라이머로부터 시드 투자를 유치하였습니다.\n저희 팀 헬린캠프에서 초기 창업 멤버를 모집합니다.\n단순 직원이 아니라 같이 회사를 성장시킬 멤버를 모집합니다(급여 & 지분 및 스톡옵션 협상 가능)', 3, ' C++  JAVA  RUBY ', '2022-06-01', 1, 1, 'Node.js');
INSERT INTO project VALUES (2, 'ksh', '오프라인 교육 ERP 시스템/ 회원전용 사이트 구축', '- 오프라인 교육 ERP 시스템 / 마이페이지 사이트 구축\n- 자사에서 사용하고 있는 회원관리 ERP 사이트 고도화 및 회원 전용 마이페이지 신규 구축하는 프로젝트입니다.\n- 발주사: 비공개\n- 전체 프로젝트 일정: 2022년 7월 01일 ~ 2023년 2월 29일 (8개월)\n- 계약 기간 : 2개월\n- 인터뷰 및 계약 일정: 지원자 발생 시 인터뷰를 진행, 1~2일 내로 계약 여부를 결정하고자 합니다.\n- 계약 진행 프로세스: 프로젝트 지원 > 실무진 인터뷰 > 계약 결정', 4, ' JAVA  PHP  HTML ', '2022-06-02', '0', '0', 'JQuery');

-- participate data
INSERT INTO participate VALUES(1,"jiwoo",1);
INSERT INTO participate VALUES(2,"sehyeon",1);
INSERT INTO participate VALUES(3,"juyeon",1);
INSERT INTO participate VALUES(4,"ksh",1);

insert into participate values (5, 'ksh', 2);
insert into participate values (6, 'psrrr', 2);
insert into participate values (7, 'jiwoo', 2);

-- scrap data
INSERT INTO `happeer`.`scrap` (`sc_user`, `sc_project`, `sc_id`) VALUES ('jiwoo', '2', '1');

-- message data
INSERT INTO `happeer`.`message` (`m_id`, `m_sender`, `m_receiver`, `m_type`, `m_content`, `m_date`) VALUES ('1', 'juyeon', 'jiwoo', '팀원으로 참가하고 싶어요~!', '헬맅캠프 프로젝트 참가하고 싶습니다!! 열심히 할 자신 있어요', '2022-06-19 19:30:38');

-- evaluation data
INSERT into evaluation VALUES (1, 'jiwoo', 'sehyeon', 0,0,0,0,0,0);
INSERT into evaluation VALUES (1, 'jiwoo', 'ksh', 0,0,0,0,0,0);
INSERT into evaluation VALUES (1, 'jiwoo', 'juyeon', 0,0,0,0,0,0);
INSERT into evaluation VALUES (1, 'sehyeon', 'jiwoo', 0,0,0,0,0,0);
INSERT into evaluation VALUES (1, 'sehyeon', 'ksh', 0,0,0,0,0,0);
INSERT into evaluation VALUES (1, 'sehyeon', 'juyeon', 0,0,0,0,0,0);
INSERT into evaluation VALUES (1, 'ksh', 'jiwoo', 0,0,0,0,0,0);
INSERT into evaluation VALUES (1, 'ksh', 'sehyeon', 0,0,0,0,0,0);
INSERT into evaluation VALUES (1, 'ksh', 'juyeon', 0,0,0,0,0,0);
INSERT into evaluation VALUES (1, 'juyeon', 'jiwoo', 0,0,0,0,0,0);
INSERT into evaluation VALUES (1, 'juyeon', 'sehyeon', 0,0,0,0,0,0);
INSERT into evaluation VALUES (1, 'juyeon', 'ksh', 0,0,0,0,0,0);

UPDATE `happeer`.`evaluation` SET `ev_value1` = '1', `ev_value2` = '2', `ev_value3` = '3', `ev_value4` = '4', `ev_value5` = '5', `ev_evaluated` = '1' WHERE (`ev_project` = '1') and (`ev_rater` = 'jiwoo') and (`ev_rated` = 'juyeon');
UPDATE `happeer`.`evaluation` SET `ev_value1` = '3', `ev_value2` = '4', `ev_value3` = '5', `ev_value4` = '1', `ev_value5` = '2', `ev_evaluated` = '1' WHERE (`ev_project` = '1') and (`ev_rater` = 'juyeon') and (`ev_rated` = 'jiwoo');
UPDATE `happeer`.`evaluation` SET `ev_value1` = '2', `ev_value2` = '2', `ev_value3` = '4', `ev_value4` = '5', `ev_value5` = '5', `ev_evaluated` = '1' WHERE (`ev_project` = '1') and (`ev_rater` = 'ksh') and (`ev_rated` = 'jiwoo');
