const express = require("express");
const router = express.Router();
const db = require("../db");

router.get('/*', function(req,res) {
	const sql= "SELECT * FROM user WHERE user_id= ? ";
	db.query(sql, [req.params['0']], function (err, results) {
		if (err)
			console.log(err);
			console.log(results[0]);
		if (req.session.user) {
		return res.render("user_page", {
				users: results[0],
        user_id: req.session.user['userid'],
				user_nickname: req.session.user['user_nickname'],
			});
		} else {
			return res.render("user_page", {
				users: results[0],
        user_id: "비회원",
				user_nickname: " ",
			});
		}
		})
});

module.exports=router;