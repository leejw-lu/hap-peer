const express = require("express");
const router = express.Router();
const db = require("../db");

let proj_id = {
	id: 0
};
router.get('/*', function(req,res) {
	const sql = 'SELECT * FROM project WHERE proj_id=?';
	const sql_parti = 'SELECT * FROM participate WHERE part_project=?';
	const sql2 = 'SELECT * FROM project LEFT OUTER JOIN scrap ON (proj_id = sc_project and sc_user = ?) where proj_id = ?';
	proj_id.id = req.params['0'];
	
	// const sql_insert = 'INSERT INTO evaluation (ev_project, ev) VALUES (?, ?)';
	// const params_insert = [];
	// db.query(sql_insert, params_insert, function(err) {
	// 	if (err) console.log(err);
	// 	else console.log("eval input success");
	// })
	
	db.query(sql_parti, req.params['0'], function(error, part_res) {
		if(error) console.log(error);
		if (req.session.user){
			db.query(sql2, [req.session.user['userid'],proj_id.id], function(err, results){
				console.log(part_res);
				return res.render("project_detail", {
					user_id: req.session.user['userid'],
					project_detail: results[0],
					part_proj: part_res
				});
			})}
			else{
				db.query(sql, [proj_id.id], function(err, results){
					return res.render("project_detail", {
						user_id: "비회원",
						project_detail: results[0],
						part_proj: part_res
					});
				})
			}
		});
});

router.post('/*',function(req,res) {
	const proj = proj_id.id;
	const member=req.body.member;
	const sql="INSERT INTO participate (part_user, part_project) VALUES (?, ?)";
	const params=[member,proj];
	db.query("SELECT * FROM user WHERE user_id = ?", [member], function(err,rows) {
		if (rows.length>0) {
			db.query(`SELECT * FROM participate WHERE part_user=? AND part_project=?`, [member, proj], function(error,row) {
				if (error) console.error("err : " + error);
				if (row.length > 0) {
					console.log("이미 존재하는 멤버");
					res.write(`<script type="text/javascript">alert('Member already exit!')</script>`);
					res.write(`<script>window.location="/project_detail/${proj_id.id}"</script>`);
				}
				else {
					db.query(sql,params,function(err) { 
							if (err) console.error("err : " + err);
							else{
									console.log(params);
									res.write(`<script type="text/javascript">alert('Success!')</script>`);
									res.write(`<script>window.location="/project_detail/${proj_id.id}"</script>`);
							}
					})
				}
			})
		 }
	 else{
			 console.log(err);
			 console.log("member 존재하지 않음");
			 res.write(`<script type="text/javascript">alert('Member ID does not exit!')</script>`);
			 res.write(`<script>window.location="/project_detail/${proj_id.id}"</script>`); 
	 }
}) 
});

module.exports=router;