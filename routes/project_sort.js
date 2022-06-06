const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", function(req, res) {
    db.query("SELECT * FROM project ORDER BY proj_date desc", function(err, result, fields){
        if(err) console.log(err);

        if (req.session.user){
            return res.render("project_sort", {
				user_id: req.session.user['userid'],
				title:"Projects",
                data: result,
			});
		}
		else{
            return res.render("project_sort", {
				user_id: "비회원",
				title:"Projects",
                data: result,
			});
		}

    })
});

router.post("/", function (req, res) {
    const sql = "SELECT * FROM project where (proj_title LIKE ?) and (proj_leader LIKE ?) and (proj_level LIKE ?) AND (proj_stack LIKE ?) ORDER BY proj_date desc";
    let title = '%'+req.body.title+'%';
    let teamleader = '%'+req.body.teamleader+'%';
    let level = req.body.level;
    let skillstack='%'+req.body.skillstack+'%';
    if (title=='NULL') title = '';
    if (teamleader=='NULL') teamleader = '';
    if (skillstack=='NULL') skillstack = '';
    if (skillstack =='%'+'other'+'%') skillstack = '%'+req.body.etc+'%';
    const params = [title,teamleader,level,skillstack];
    db.query(sql, params, function(err, result, fields){
        if(err) throw err;
        else{
            console.log(skillstack);
            if (req.session.user){
                return res.render("project_sort", {
                    user_id: req.session.user['userid'],
                    title:"Projects",
                    data: result,
                });
            }
            else{
                return res.render("project_sort", {
                    user_id: "비회원",
                    title:"Projects",
                    data: result,
                });
            }
        }
    })
});

module.exports = router;