const express = require("express");
const { NULL } = require("mysql/lib/protocol/constants/types");
const router = express.Router();
const db = require("../db"); //디비연결

router.get('/', function(req,res) {
    //req.session.user는 객체
    if(req.session.user){  //로그인 되어있는가?
        //객체key값 userid, nickname, userInfo, userStack 넘겨서 회원정보 마이페이지에 보이게하기
        res.render("mypage",{user_id: req.session.user['userid'], user_nickname: req.session.user['nickname'], user_info: req.session.user['userInfo'], user_stack: req.session.user['userStack']});
    } else{
        console.log('로그인이 필요합니다.');
        res.write(`<script type="text/javascript">alert('Log in to access that page')</script>`);
        res.write('<script>window.location="/login"</script>');
    }

})

module.exports = router;
