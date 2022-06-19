const express = require("express");
const router = express.Router();
const db = require("../db");

router.get('/', function (req, res) {
  if (req.session.user) { //로그인 했을시
    const sql = 'SELECT * FROM project';
    db.query(sql, function (err, results) {
      if (err)
        console.log(err);
      return res.render("main", {
        user_id: req.session.user['userid'],
        user_nickname: req.session.user['nickname'],
        project_list: results
      });
    })

  } else { //로그인 안했을시
    const sql = 'SELECT * FROM project';
    db.query(sql, function (err, results) {
      if (err)
        console.log(err);
      return res.render("main", {
        user_id: "비회원",
        user_nickname: " ",
        project_list: results
      });
    });
  }


});

module.exports = router;