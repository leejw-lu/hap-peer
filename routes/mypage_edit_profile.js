const express = require("express");
const { NULL } = require("mysql/lib/protocol/constants/types");
const { connect } = require("../db");
const router = express.Router();
const db = require("../db"); //디비연결

router.get('/', function(req,res) {
    //변경이 불가한 userid는 프로필 편집 페이지에 보이게 하기
    res.render("mypage_edit_profile",{
        user_id: req.session.user['userid'],
        user_nickname: req.session.user['nickname'],
        user_info: req.session.user['userInfo'],
        user_stack: req.session.user['userStack']});
})

router.post('/', function(req,res) {
    //db.connect();
    var userInfo=req.body.userInfo;
    var userStack=req.body.userStack;
    
    var sql="UPDATE user SET userInfo=?, userStack=?";
    var params = [userInfo,userStack]

    db.query(sql, params, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log(userInfo);
            console.log(userStack);
            res.render("mypage",{
                user_id: req.session.user['userid'],
                user_nickname: req.session.user['nickname'],
                user_info: req.session.user['userInfo'],
                user_stack: req.session.user['userStack']});
        }
    })

    //db.end();
})

module.exports = router;
