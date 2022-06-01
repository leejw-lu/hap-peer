const express = require("express");
const router = express.Router();
const db = require("../db"); //디비 사용위해 필요

router.get('/', function(req,res){
	
    if(req.session.user){  //로그인 후 프로젝트 등록 페이지
		return res.render("project_regist", {
			user_id: req.session.user['userid'],
		});
    } else{
        res.write(`<script type="text/javascript">alert('Available after login!')</script>`);
        res.write('<script>window.location="/"</script>');
    }
   
})

router.post('/', async function(req,res) {
	const proj_title=req.body.proj_title;
  const proj_content=req.body.proj_content;
	const proj_level=req.body.proj_level;
	const proj_stack = req.body.proj_stack;
	const proj_date= new Date();
	const user_id = req.session.user['userid'];
	const sql="INSERT INTO project (proj_title, proj_content, proj_level, proj_stack, proj_date, proj_leader) VALUES (?, ?, ?, ?, ?,?)";
  const params=[proj_title,proj_content,proj_level,proj_stack,proj_date,user_id]
	console.log("프로젝트 제출");
	db.query(sql, params, function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log("success input");
		}
		res.write('<script>window.location="/"</script>');
        res.end();
	})
})

module.exports = router;