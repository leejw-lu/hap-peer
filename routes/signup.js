const express = require("express");
const router = express.Router();
const db = require("../db");  //db연결
//const bcrypt = require("bcrypt"); //비번 암호화 추후 구현

router.get('/', function(req,res){
    res.render("signUp");
})

router.post("/",function(req,res){
    const userid=req.body.userid;
    const password=req.body.password;
    const check_pw=req.body.check_pw;
    const nickname=req.body.nickname;
    const image=req.body.image;

    const sql="INSERT INTO user (user_id, user_password, user_nickname, user_image, user_stack) VALUES (?, ?, ?, ?, ?)";
    const params=[userid,password,nickname,'/public/images/default_user_image.png', " "]

    if(userid.length>0 && password.length>0 && check_pw.length>0 && nickname.length>0 ){ //빈칸없게 작성
      if(password==check_pw){
        db.query(sql,params,function(err) {
          if (err) { 
              //이미 존재하는 아이디 (중복체크)
              console.log(err); 
              res.write(`<script type="text/javascript">alert('Duplicate ID!')</script>`);
              res.write('<script>window.location="/signup"</script>'); 
            } else {  
              //회원가입 성공 -> login 페이지로
              res.write('<script>window.location="/login"</script>');
              res.end();
            }
      })} else {  //비밀번호 일치하지 않음
        res.write(`<script type="text/javascript">alert('Password is incorrect')</script>`);
        res.write('<script>window.location="/signup"</script>'); 
      }
    } else {  //빈칸입력시
      res.write(`<script type="text/javascript">alert('Fill in blanks')</script>`);
      res.write('<script>window.location="/signup"</script>'); 
    }

})

//꼭 해주기
module.exports = router;