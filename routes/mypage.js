const express = require("express");
const { NULL } = require("mysql/lib/protocol/constants/types");
const router = express.Router();
const db = require("../db"); //디비연결
const multer = require("multer");
const path = require("path");

router.get('/', function(req,res) {
    //req.session.user는 객체
    if(req.session.user){  //로그인 되어있는가?
        const sql = "SELECT u.user_info, u.user_stack, u.user_image, p.proj_title, p.proj_id, p.recruit_status, p.develop_status FROM user AS u LEFT OUTER JOIN participate AS pa ON u.user_id = pa.part_user LEFT OUTER JOIN project AS p ON pa.part_project = p.proj_id WHERE u.user_id = ?";
        db.query(sql, [req.session.user['userid']], function(err, rows) {
            if(err) console.error("err: ", err);

            //객체key값 userid, nickname views로 넘겨서 회원정보 마이페이지에 보이게하기
            res.render("mypage",{
                user_id: req.session.user['userid'],
                user_nickname: req.session.user['nickname'], rows: rows});

                console.log(rows);
        })

    } else{  //로그인하지 않고 접근한 경우
        console.log('로그인이 필요합니다.');
        res.write(`<script type="text/javascript">alert('Log in to access that page')</script>`);
        res.write('<script>window.location="/login"</script>');
    }

})

module.exports = router;
