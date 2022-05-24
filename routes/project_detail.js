const express = require("express");
const router = express.Router();
const db = require("../db");

router.get('/*', function(req,res) {
	const sql = `SELECT * FROM project where proj_id=${req.params['0']}`;
	db.query(sql, function (err, results) {
		if (err) console.log(err);
			console.log(results[0]);

		if (req.session.user){
			return res.render("project_detail", {
				user_id: req.session.user['userid'],
				project_detail: results[0]
			});
		}
		else{
			return res.render("project_detail", {
				user_id: "비회원",
				project_detail: results[0]
			});
		}

		})
});

module.exports=router;