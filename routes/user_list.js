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
  let id = '%' + req.body.id + '%';
  let nickname = '%' + req.body.nickname + '%';
  let skillstack = '%' + req.body.skillstack + '%';
  let skilletc = "";
  if (id == 'NULL') id = '';
  if (nickname == 'NULL') nickname = '';
  if (skillstack == 'NULL') skillstack = '';
  if (skillstack == '%' + 'other' + '%'){
    skilletc = '%' + req.body.etc + '%';
    skillstack = '%%';}
  const params = [id, nickname, skillstack, skilletc];
  db.query(sql, params, function (err, results) {
    if (err) throw err;
    else {
      if (req.session.user) {
        return res.render("user_list", {
          user_id: req.session.user['userid'],
          user_nickname: req.session.user['nickname'],
          user_list: results
        });
      }
      else {
        return res.render("user_list", {
          user_id: "비회원",
          user_nickname: " ",
          user_list: results
        });
      }
    }
  })
});

module.exports = router;
