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
	const proj_id = new Date() % 10000;
	const proj_title=req.body.proj_title;
	let proj_stack = "";
	//skillstack배열의 값을 문자열로 변환하여 저장 (앞 뒤 " "로 구분) 
	if (req.body.skillstack instanceof Array){
	req.body.skillstack.forEach(element => {
		proj_stack = proj_stack + element;
	});}
	//스택이 하나일 경우 이를 배열로 인식하지못해 forEach오류발생 -> 문자열로 저장
    else {proj_stack = req.body.skillstack;};
	//기타 스택 저장
	if (typeof req.body.etc != 'undefined') proj_stack = proj_stack + ' '+req.body.etc+' ';
	const proj_content=req.body.proj_content;
	const proj_level=req.body.proj_level;
	const proj_date= new Date();
	const user_id = req.session.user['userid'];
	const sql="INSERT INTO project (proj_id, proj_title, proj_content, proj_level, proj_stack, proj_date, proj_leader) VALUES (?, ?, ?, ?, ?, ?,?)";
  const params=[proj_id, proj_title,proj_content,proj_level,proj_stack,proj_date,user_id]
	const sql2="INSERT INTO participate (part_project, part_user) VALUES (?, ?)";
  const params2=[proj_id, user_id];
	console.log("프로젝트 제출");
	db.query(sql, params, function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log("success input");
			db.query(sql2, params2, function(err) {
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