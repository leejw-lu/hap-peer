const express = require("express");
const { NULL } = require("mysql/lib/protocol/constants/types");
const { connect } = require("../db");
const router = express.Router();
const db = require("../db");

let proj_id = {
  id: 0
};

router.get('/*', function (req, res) {
  proj_id.id = req.params['0'];
  const sql = `SELECT * FROM project WHERE proj_id=?`;
  db.query(sql, [req.params['0']], function (err, results) {
    if (err) console.log(err);
    if (req.session.user) {
      return res.render("project_edit", {
        user_id: req.session.user['userid'],
        project_detail: results[0]
      });
    }
    else {
      return res.render("project_edit", {
        user_id: "비회원",
        project_detail: results[0]
      });
    }
  })
})

router.post('/*', function (req, res) {
  const proj_title = req.body.proj_title;
  const proj_content = req.body.proj_content;
  const proj_level = req.body.proj_level;
  const proj_skilletc= req.body.etc;
  let proj_stack = "";
  if (req.body.skillstack instanceof Array) {
    req.body.skillstack.forEach(element => {
      proj_stack = proj_stack + element;
    });
  }
  //skillstack 배열로 받아서 스트링으로 합치기
  else { proj_stack = req.body.skillstack; };
  //skillstack 한개만 선택된 경우 배열로 인식되지 않아 바로 userstack에 넣음
  if (typeof req.body.etc != 'undefined') proj_skilletc ;
  const recruit_status = req.body.recruit_status;
  const develop_status = req.body.develop_status;
  
  const sql = "UPDATE project SET proj_title=?, proj_content=?, proj_level=?, proj_stack=?, recruit_status=?, develop_status=?, proj_stacketc=? WHERE proj_id=?";
  const params = [proj_title, proj_content, proj_level, proj_stack, recruit_status, develop_status, proj_skilletc, proj_id.id]

  if(recruit_status==0 && develop_status==1){ //팀원모집마감 안했는데 개발완료 상태로 바꾸기 불가능
    res.write(`<script type="text/javascript">alert('Please recruit team members first!! ')</script>`);
    res.write(`<script>window.location="/project_detail/${proj_id.id}"</script>`);
  }
  else{
    db.query(sql, params, function (err) {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/project_detail/" + proj_id.id);
      }
    })
  }

})

module.exports = router;
