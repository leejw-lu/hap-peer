const express = require("express");
const router = express.Router();
const db = require("../db");

router.get('/*', function (req, res) {
  //유저정보 및 유저 평점정보 받아오기
  const sql = "SELECT * FROM user WHERE user_id= ? ";
  const sql2 = "select avg(ev_value1) as v1, avg(ev_value2) as v2, avg(ev_value3) as v3, avg(ev_value4) as v4, avg(ev_value5) as v5, count(*)as num from evaluation where ev_rated= ? and ev_evaluated=1";
  db.query(sql, [req.params['0']], function (err, results) {
    if (err) console.log(err);
    
    db.query(sql2, [req.params['0']], function (err, rows) {  //평가테이블에서 해당유저 평가값 받기
      if (err) console.log(err);
      if (rows.length > 0) {
        if (req.session.user) {
          res.render("user_page", {
            users: results[0],
            ev_value: rows[0],
            user_id: req.session.user['userid'],
            user_nickname: req.session.user['user_nickname'],
          });
        } else {
          res.render("user_page", {
            users: results[0],
            ev_value: rows[0],
            user_id: "비회원",
            user_nickname: " ",
          });
        }
      }
      else { //아직 평가테이블에 해당유저 정보 X
        if (req.session.user) {
          res.render("user_page", {
            users: results[0],
            ev_value: "정보없음",
            user_id: req.session.user['userid'],
            user_nickname: req.session.user['user_nickname'],
          });
        } else {
          res.render("user_page", {
            users: results[0],
            ev_value: "정보없음",
            user_id: "비회원",
            user_nickname: " ",
          });
        }
      }
    })
  })
});

module.exports = router;