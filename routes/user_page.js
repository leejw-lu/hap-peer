const express = require("express");
const router = express.Router();
const db = require("../db");

router.get('/*', function(req,res) {

	const sql= "SELECT * FROM user WHERE user_id= ? ";
	const sql2="select avg(ev_value1) as v1, avg(ev_value2) as v2, avg(ev_value3) as v3, avg(ev_value4) as v4, avg(ev_value5) as v5, count(*)as num from evaluation where ev_rated= ? and ev_evaluated=1";
	db.query(sql, [req.params['0']], function (err, results) { //유저정보 얻기
		if (err) console.log(err);
		console.log(results[0]);

		db.query(sql2,[req.params['0']],function(err,rows){		//평가table에서 유저정보 확인
			if (err) console.log(err);
			if(rows.length > 0 ){
				console.log(rows[0]);
				res.render("user_page", {
					users: results[0],
					ev_value:rows[0],
					user_id: req.session.user['userid'],
					user_nickname: req.session.user['user_nickname'],
				});
			}
			else{ //평가table에 피평가id없음 + 평가table에 있지만 아직 평가 전
				res.render("user_page", {
					users: results[0],
					ev_value:"정보없음",
					user_id: req.session.user['userid'],
					user_nickname: req.session.user['user_nickname'],
				});
			}

		})
// 	db.query(sql, [req.params['0']], function (err, results) {
// 		if (err)
// 			console.log(err);
// 			console.log(results[0]);
// 		if (req.session.user) {
// 		return res.render("user_page", {
// 				users: results[0],
//         user_id: req.session.user['userid'],
// 				user_nickname: req.session.user['user_nickname'],
// 			});
// 		} else {
// 			return res.render("user_page", {
// 				users: results[0],
//         user_id: "비회원",
// 				user_nickname: " ",
// 			});
// 		}
		})
});

module.exports=router;