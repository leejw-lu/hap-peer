const express = require("express");
const { NULL } = require("mysql/lib/protocol/constants/types");
const router = express.Router();
const db = require("../db");

router.get('/', function (req, res) {
  if (req.session.user) {
    const sql = 'SELECT * FROM user';
    db.query(sql, function (err, results) {
      if (err)
        console.log(err);
      return res.render("user_list", {
        user_id: req.session.user['userid'],
        user_nickname: req.session.user['nickname'],
        user_list: results
      });
    })
  } else {
    const sql = 'SELECT * FROM user';
    db.query(sql, function (err, results) {
      if (err)
        console.log(err);
      return res.render("user_list", {
        user_id: "비회원",
        user_nickname: " ",
        user_list: results
      });
    })
  }
});

router.post("/", function (req, res) {
  const sql = "SELECT * FROM user WHERE (user_id LIKE ?) AND (user_nickname LIKE ?) AND (user_stack LIKE ?) AND (user_stacketc LIKE ?)";
  const sortData = [req.body.id, req.body.nickname, req.body.skillstack, req.body.etc];
  let id = '%' + req.body.id + '%';
  let nickname = '%' + req.body.nickname + '%';
  let skillstack = '%' + req.body.skillstack + '%';
  let skilletc = '%' + req.body.etc + '%';
  if (skillstack == '%'+'other'+'%') skillstack = '%%';
  //기타를 선택한 경우 '선택'이라는 글자가 검색되지 않게함
  const params = [id, nickname, skillstack, skilletc];
  db.query(sql, params, function (err, results) {
    if (err) throw err;
    else {
      if (req.session.user) {
        return res.render("user_list", {
          user_id: req.session.user['userid'],
          user_nickname: req.session.user['nickname'],
          user_list: results,
          sortData: sortData,
        });
      }
      else {
        return res.render("user_list", {
          user_id: "비회원",
          user_nickname: " ",
          user_list: results,
          sortData: sortData,
        });
      }
    }
  })
});

module.exports = router;
