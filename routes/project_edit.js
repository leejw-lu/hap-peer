const express = require("express");
const { NULL } = require("mysql/lib/protocol/constants/types");
const { connect } = require("../db");
const router = express.Router();
const db = require("../db"); //디비연결
let proj_id = {
    id: 0
};

router.get('/*', function (req, res) {
    //변경이 불가한 userid는 프로필 편집 페이지에 그대로 보이게 하기
    proj_id.id = req.params['0'];
    const sql = `SELECT * FROM project WHERE proj_id=?`;
    db.query(sql, [req.params['0']], function (err, results) {
        if (err) console.log(err);
        console.log(results[0]);
        if (req.session.user) {
            return res.render("project_edit", {
                user_id: req.session.user['userid'],
                project_detail: results[0]
            });
        }
        else {
            return res.render("project_edit", {
                user_id: "비회원",
                project_detail: results[0]
            });
        }
    })
})

router.post('/*', async function (req, res) {
    const proj_title = req.body.proj_title;
    const proj_content = req.body.proj_content;
    const proj_level = req.body.proj_level;
    let proj_stack = "";
	//skillstack배열의 값을 문자열로 변환하여 저장 (앞 뒤 " "로 구분) 
	if (req.body.skillstack instanceof Array){
	req.body.skillstack.forEach(element => {
		proj_stack = proj_stack + element;
	});}
    //스택이 하나일 경우 이를 배열로 인식하지못해 forEach오류발생 -> 문자열로 저장
    else {proj_stack = req.body.proj_stack;};
    //기타 스택 저장
    if (req.body.etc != 'NULL') proj_stack = proj_stack + ' '+req.body.etc+' ';
    const proj_date = req.body.proj_date;
    const recruit_status = req.body.recruit_status;
    const develop_status = req.body.develop_status;
    const sql = "UPDATE project SET proj_title=?, proj_content=?, proj_level=?, proj_stack=?, recruit_status=?, develop_status=? WHERE proj_id=?";
    const params = [proj_title, proj_content, proj_level, proj_stack, recruit_status, develop_status, proj_id.id]
    db.query(sql, params, function (err) {
        if (err) {
            console.log(err);
        } else {
            // res.write(`<script type="text/javascript">alert('Edit Successful')</script>`);
            // res.write('<script>window.location="/project_sort"</script>');
            // res.end();
            res.redirect("/project_detail/"+proj_id.id);
        }
    })

})

module.exports = router;
