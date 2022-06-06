const express = require("express");
const { NULL } = require("mysql/lib/protocol/constants/types");
const { connect } = require("../db");
const router = express.Router();
const db = require("../db"); //디비연결
const multer = require('multer');
const path = require('path');



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
    let userInfo=req.body.userInfo;
    let userStack = "";
	//skillstack배열의 값을 문자열로 변환하여 저장 (앞 뒤 " "로 구분) 
	if (req.body.skillstack instanceof Array){
	req.body.skillstack.forEach(element => {
		userStack = userStack + element;
	});}
	//스택이 없을 경우 스페이스 저장
    else if (req.body.skillstack == 'NULL'){userStack=" ";}
    //스택이 하나일 경우 이를 배열로 인식하지못해 forEach오류발생 -> 문자열로 저장
    else {userStack = req.body.skillstack;};
    //기타 스택 저장
	if (req.body.etc != 'NULL') userStack = userStack + ' '+req.body.etc+' ';
    let userImage = req.file == undefined ? '/public/images/default_user_image.png' : req.file.path; // req.file : object
    
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
