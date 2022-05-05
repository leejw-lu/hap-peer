var express = require("express");
var router = express.Router();
var db = require("../db");

router.get('/', function(req,res){
    res.render("signUp");
})

router.post("/",function(req,res){
    const userid=req.body.userid;
    const password=req.body.password;
    const check_pw=req.body.check_pw;
    const nickname=req.body.nickname;

    const sql="INSERT INTO user (iduser, password, nickname) VALUES (?, ?, ?)";
    const params=[userid,password,nickname]

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
  
module.exports = router;