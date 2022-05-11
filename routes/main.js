const express = require("express");
const router = express.Router();
//const db = require("../db"); //디비연결

router.get('/', function(req,res) {
    //req.session.user는 객체
    if(req.session.user){  //로그인 되어있는가?
        console.log("로그인 성공" );
        //객체key값 userid와 nickname 넘겨서 회원정보 메인화면에 보이게하기
        res.render("main",{
            user_id: req.session.user['userid'], 
            user_nickname: req.session.user['nickname']
        });
    } else{
        console.log("비회원상태");
        res.render("main",{user_id: "비회원",user_nickname:" "});
    }
})

module.exports=router;