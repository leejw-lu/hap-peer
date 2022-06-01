const express = require("express");
const router = express.Router();
const db = require("../db");

let proj_id = {
	id: 0
};
router.get('/*', function(req,res) {
	const sql = 'SELECT * FROM project WHERE proj_id=?';
	const sql2 = 'SELECT * FROM project LEFT OUTER JOIN scrap ON (proj_id = sc_project and sc_user = ?) where proj_id = ?';
	proj_id.id = req.params['0'];
	if (req.session.user){
		db.query(sql2, [req.session.user['userid'],proj_id.id], function(err, results){
		return res.render("project_detail", {
			user_id: req.session.user['userid'],
			project_detail: results[0]
		});
	})}
	else{
		db.query(sql, [proj_id.id], function(err, results){
		return res.render("project_detail", {
			user_id: "비회원",
			project_detail: results[0]
		});
	})
}});

router.post('/*',function(req,res) {
	const proj_leader=req.session.user['userid'];
	const proj = proj_id.id;
	const member=req.body.member;
	const sql="INSERT INTO participate (part_user, part_project) VALUES (?, ?)";
	const params=[member,proj];
	db.query("SELECT * FROM user WHERE user_id = ?", [member], function(err,rows) {    //받는사람이 user테이블에 있는지 확인해야한다.
		if (rows.length>0) {   //receiver 존재! -> db에 저장
			 db.query(sql,params,function(err) { 
					 if (err) console.error("err : " + err);
					 else{
							 console.log(params);
							 res.write(`<script type="text/javascript">alert('member add successfully!')</script>`);
							 res.write('<script>window.location="/project_sort"</script>');
					 }
			 })
		 }
	 else{ //receiver존재X
			 console.log(err);
			 console.log("member 존재하지 않음");
			 res.write(`<script type="text/javascript">alert('Member ID does not exit!')</script>`);
			 res.write('<script>window.location="/project_sort"</script>'); 
	 }
}) 
});

module.exports=router;