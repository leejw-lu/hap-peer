const express = require("express");
const router = express.Router();
const db = require("../db");

router.get('/', function(req,res) {
	var sql = 'SELECT * FROM project';
	db.query(sql, function (err, results) {
		if (err)
			console.log(err);
		return res.render("project_page", {
				project_list: results
			});
		})
});

module.exports=router;