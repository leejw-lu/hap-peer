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

router.get("/date", function(req, res) {
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

router.get("/level_1", function(req, res) {
    db.query("SELECT * FROM project where proj_level=1 ORDER BY proj_date desc", function(err, result, fields){
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

router.get("/level_2", function (req, res) {
    db.query("SELECT * FROM project where proj_level=2 ORDER BY proj_date desc", function(err, result, fields){
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

router.get("/level_3", function (req, res) {
    db.query("SELECT * FROM project where proj_level=3 ORDER BY proj_date desc", function(err, result, fields){
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
    const sql = "SELECT * FROM project where proj_stack LIKE ?";
    const skillstack=req.body.skillstack;
    db.query(sql, skillstack, function(err, result, fields){
        if(err) throw err;
        else{
            var page =  ejs.render(view, {
                user_id: req.session.user['userid'],
                title:"Projects",
                data: result,
            });
            res.send(page);
        }
    })
});

module.exports = router;