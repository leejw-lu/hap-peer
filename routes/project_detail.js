const express = require("express");
const router = express.Router();
const db = require("../db");

router.get('/*', function(req,res) {
	var sql = `SELECT * FROM project where proj_id=${req.params['0']}`;
	db.query(sql, function (err, results) {
		if (err)
			console.log(err);
			console.log(results[0]);
		return res.render("project_detail", {
				project_detail: results[0]
			});
		})
});

module.exports=router;