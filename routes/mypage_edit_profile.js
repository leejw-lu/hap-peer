const express = require("express");
const { NULL } = require("mysql/lib/protocol/constants/types");
const { connect } = require("../db");
const router = express.Router();
const db = require("../db"); //디비연결

router.get('/', function(req,res) {
    //변경이 불가한 userid는 프로필 편집 페이지에 그대로 보이게 하기
    res.render("mypage_edit_profile",{
        user_id: req.session.user['userid']});
})

router.post('/', function(req,res) {
    var userInfo=req.body.userInfo;
    var userStack=req.body.userStack;
    
    //DB에 user_info, user_stack 업데이트
    var sql="UPDATE user SET user_info=?, user_stack=?";
    var params = [userInfo,userStack]

    db.query(sql, params, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log(userInfo);
            console.log(userStack);
            res.write(`<script type="text/javascript">alert('Edit Successful')</script>`);
            res.write('<script>window.location="/mypage"</script>');
            res.end();
        }
    })

})

module.exports = router;
