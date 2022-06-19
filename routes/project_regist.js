const express = require("express");
const router = express.Router();
const db = require("../db");

router.get('/', function (req, res) {

  if (req.session.user) {
    return res.render("project_regist", {
      user_id: req.session.user['userid'],
    });
  } else {
    res.write(`<script type="text/javascript">alert('Available after login!')</script>`);
    res.write('<script>window.location="/"</script>');
  }
})

router.post('/', async function (req, res) {
  const proj_id = new Date() % 10000;
  const proj_title = req.body.proj_title;
  const proj_skilletc = req.body.etc;
  let proj_stack = "";
  if (req.body.skillstack instanceof Array) {
    req.body.skillstack.forEach(element => {
      proj_stack = proj_stack + element;
    });
  }
  //skillstack 배열로 받아서 스트링으로 합치기
  else { proj_stack = req.body.skillstack; };
  //skillstack 한개만 선택된 경우 배열로 인식되지 않아 바로 userstack에 넣음
  const proj_content = req.body.proj_content;
  const proj_level = req.body.proj_level;
  const proj_date = new Date();
  const user_id = req.session.user['userid'];
  const sql = "INSERT INTO project (proj_id, proj_title, proj_content, proj_level, proj_stack, proj_date, proj_leader, proj_stacketc) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  const params = [proj_id, proj_title, proj_content, proj_level, proj_stack, proj_date, user_id, proj_skilletc]
  const sql2 = "INSERT INTO participate (part_project, part_user) VALUES (?, ?)";
  const params2 = [proj_id, user_id];
  db.query(sql, params, function (err) {
    if (err) {
      console.log(err);
    } else {
      db.query(sql2, params2, function (err) {
        if (err) {
          console.log(err);
        }
      })
    }
    res.write('<script>window.location="/"</script>');
    res.end();
  })
})

module.exports = router;