const express = require("express");
const { NULL } = require("mysql/lib/protocol/constants/types");
const router = express.Router();
const db = require("../db"); //디비연결
const multer = require("multer");
const path = require("path");

router.get('/', function(req,res) {
    //req.session.user는 객체
    if(req.session.user){  //로그인 되어있는가?
        const sql = "SELECT u.user_info, u.user_stack, u.user_image, p.proj_title, p.proj_id FROM user AS u LEFT OUTER JOIN scrap AS s ON u.user_id = s.sc_user LEFT OUTER JOIN project AS p ON s.sc_project = p.proj_id WHERE u.user_id = ?"
        //user테이블의 정보와 스크랩된 프로젝트 불러오기
        db.query(sql, [req.session.user['userid']], function(err, rows){
            if (err) console.error("err: ", err);
            res.render("mypage", {
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
