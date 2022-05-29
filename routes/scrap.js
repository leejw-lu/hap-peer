const express = require("express");
const router = express.Router();
const db = require("../db");
let proj_id = {
    id: 0
};

router.get('/*', function (req, res) {
    proj_id.id = req.params['0'];
    const sc_id = Date.now() % 2000000;
    const sc_user = req.session.user['userid'];
    const sc_project = proj_id.id;
    const sql = "INSERT INTO scrap (sc_id, sc_user, sc_project) VALUES (?, ?, ?) ";    //스크랩 삽입 sql
    const params = [sc_id, sc_user, sc_project];    //스크랩 삽입 params
    const params2 = [sc_user, sc_project];    //기존 스크랩 존재 여부 판단 params
    db.query("SELECT * FROM scrap where sc_user = ? and sc_project = ?", params2, function(err,rows) {
        if (rows.length > 0) { //기존 스크랩 존재 여부 판단
            console.log("already exists");
            res.write(`<script type="text/javascript">alert('already exists')</script>`);
            res.write('<script>window.location="/project_sort"</script>');
		 }
	    else{
        db.query(sql,params,function(err) { 
            if (err) console.error(err);
            else{
                    console.log("스크랩");
                    res.write(`<script type="text/javascript">alert('successfully bookmarked')</script>`);
                    res.write('<script>window.location="/project_sort"</script>');
            }
    })}
}) 
});

module.exports = router;