const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", function (req, res) {
  db.query("SELECT * FROM project ORDER BY proj_date desc", function (err, result, fields) {
    if (err) console.log(err);
    if (req.session.user) {
      return res.render("project_sort", {
        user_id: req.session.user['userid'],
        title: "Projects",
        data: result,
      });
    }
    else {
      return res.render("project_sort", {
        user_id: "비회원",
        title: "Projects",
        data: result,
      });
    }
  })
});


router.post("/", function (req, res) {
  const sql = "SELECT * FROM project where (proj_title LIKE ?) and (proj_leader LIKE ?) and (proj_level LIKE ?) AND (proj_stack LIKE ?) AND (proj_stacketc LIKE ?) ORDER BY proj_date desc";
  const sortData = [req.body.title,req.body.teamleader,req.body.level,req.body.skillstack,req.body.etc];
  let title = '%' + req.body.title + '%';
  let teamleader = '%' + req.body.teamleader + '%';
  let level = req.body.level;
  let skillstack = '%' + req.body.skillstack + '%';
  let skilletc = '%' + req.body.etc + '%';
  if (level == '') level = '%';
  if (skillstack == '%'+'other'+'%') skillstack = '%%';
  if (skillstack == '%'+'total'+'%') skillstack = '%%';
  const params = [title, teamleader, level, skillstack, skilletc];
  db.query(sql, params, function (err, result, fields) {
    if (err) throw err;
    else {
      if (req.session.user) {
        return res.render("project_sort", {
          user_id: req.session.user['userid'],
          title: "Projects",
          data: result,
          sortData: sortData,
        });
      }
      else {
        return res.render("project_sort", {
          user_id: "비회원",
          title: "Projects",
          data: result,
          sortData: sortData,
        });
      }
    }
  })
});

module.exports = router;