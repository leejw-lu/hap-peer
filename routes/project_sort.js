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
  // 이전에 어떤 항목을 검색했는지 표시하기 위해 현재 검색 키워드들을 저장함
  let title = '%' + req.body.title + '%';
  let teamleader = '%' + req.body.teamleader + '%';
  let level = req.body.level;
  let skillstack = '%' + req.body.skillstack + '%';
  let skilletc = '%' + req.body.etc + '%';
  if (level == '') level = '%';
  if (skillstack == '%'+'other'+'%') skillstack = '%%';
  const params = [title, teamleader, level, skillstack, skilletc];
  // 검색을 위한 params
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