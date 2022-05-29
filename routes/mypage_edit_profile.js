const express = require("express");
const { NULL } = require("mysql/lib/protocol/constants/types");
const { connect } = require("../db");
const router = express.Router();
const db = require("../db"); //디비연결
const multer = require('multer');
const path = require('path');
//const fs = require('fs');
//const sharp = require("sharp");
//import express from "express";


router.get('/', function(req,res) {
    //변경이 불가한 userid는 프로필 편집 페이지에 그대로 보이게 하기
    //req.session.user는 객체
    if(req.session.user){  //로그인 되어있는가?
        const sql="SELECT user_info, user_stack, user_image FROM user WHERE user_id = ?";
        db.query(sql,[req.session.user['userid']], function(err, rows) {
            if(err) console.error("err: ", err);
            
            //객체key값 userid, nickname views로 넘겨서 회원정보 마이페이지에 보이게하기
            res.render("mypage_edit_profile",{
                user_id: req.session.user['userid'],
                user_nickname: req.session.user['nickname'], rows: rows});
        })

    } else{  //로그인하지 않고 접근한 경우
        console.log('로그인이 필요합니다.');
        res.write(`<script type="text/javascript">alert('Log in to access that page')</script>`);
        res.write('<script>window.location="/login"</script>');
    }

})

//프로필 이미지 업로드를 위한 multer
const upload = multer({
    storage:multer.diskStorage({
        destination:function(req,file,callback){
            callback(null,'uploads/') // 폴더명 : uploads 
        },
        filename:function(req,file,callback){
            callback(null, new Date().valueOf() + path.extname(file.originalname))
        }
    }),
})

router.post('/', upload.single('img'), function(req,res) {
    var userInfo=req.body.userInfo;
    var userStack=req.body.userStack;
    let userImage = req.file == undefined ? '' : req.file.path; // req.file : object
    
    //DB에 user_info, user_stack, user_image(경로) 업데이트
    var sql="UPDATE user SET user_info=?, user_stack=?, user_image=? WHERE user_id=?";
    var params = [userInfo,userStack, userImage, req.session.user['userid']]

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
