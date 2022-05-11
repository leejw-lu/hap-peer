const express = require("express");
const router = express.Router();
const db = require("../db"); //디비연결
//const bcrypt = require("bcrypt"); //비번 암호화 추후 구현

router.get('/', function(req,res){
    if(req.session.user){  //로그인 되어있는가?
        res.write('<script>window.location="/"</script>');
    } else{
        res.render("login");
    }
})

router.post('/', function(req,res) {
    const userid=req.body.userid;
    const password=req.body.password;
    //const param=[req.body.userid,req.body.password];

    if(userid.length >0 && password.length >0 ) { //빈칸없이 입력
        db.query('SELECT * FROM user WHERE user_id =?', [userid],(err,rows) => {  //select from where문 db 테이블,속성명 정확히!
            if(rows.length>0){
                if(rows[0].user_password==password){ //로그인 성공
                
                    //로그인 세션 저장
                     req.session.user = {
                         userid: rows[0].user_id,
                         nickname:rows[0].user_nickname,
                         authorized: true
                     };
                     console.log(req.session.user);
                    
                    res.write('<script>window.location="/"</script>'); 
                    res.end();
                } 
                else{
                    console.log('비밀번호가 맞지 않습니다.');
                    res.write(`<script type="text/javascript">alert('password does not correct!')</script>`);
                    res.write('<script>window.location="/login"</script>');
                    //res.redirect("/login");
                } 
            } 
            else {
                console.log('아이디가 존재하지 않습니다.');
                res.write(`<script type="text/javascript">alert('ID does not exist!')</script>`);
                res.write('<script>window.location="/login"</script>');
            }
        })
    } 
    else{ //빈칸 입력시
        res.write(`<script type="text/javascript">alert('Fill in blanks')</script>`);
        res.write('<script>window.location="/login"</script>'); 
    }

})

module.exports = router;