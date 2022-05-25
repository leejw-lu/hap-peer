const express = require("express");
const router = express.Router();
const db = require("../db");

router.get('/*', function(req,res) {
	const sql= "SELECT * FROM message WHERE m_id= ? ";
	db.query(sql, [req.params['0']], function (err, results) {
		if (err)
			console.log(err);
			//console.log(results[0]);
		res.render("message_detail", {
            user_id: req.session.user['userid'],
			message_detail: results[0]
			});
		})
});

module.exports=router;