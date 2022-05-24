var express = require("express");
var router = express.Router();
var db = require("../db"); //디비 사용위해 필요

router.get('/', function(req,res){
	console.log("GET p_r");
    res.render("project_regist");
})
router.post('/', async function(req,res) {
	const proj_id = Date.now() % 2000000;
	const proj_title=req.body.proj_title;
    const proj_content=req.body.proj_content;
	const proj_level=req.body.proj_level;
	const proj_stack = req.body.proj_stack;
	const proj_date= req.body.proj_date;
	const user_id = req.session.user['userid'];
	// const proj_date= Date();
	const sql="INSERT INTO project (proj_id, proj_title, proj_content, proj_level, proj_stack, proj_date, proj_leader) VALUES (?, ?, ?, ?, ?, ?,?)";
    const params=[proj_id, proj_title,proj_content,proj_level,proj_stack,proj_date,user_id]
	
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