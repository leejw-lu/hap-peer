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
