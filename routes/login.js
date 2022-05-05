var express = require("express");
var router = express.Router();
var db = require("../db"); //디비 사용위해 필요

router.get('/', function(req,res){
    res.render("login");
})

router.post('/', function(req,res) {
    const userid=req.body.userid;
    const password=req.body.password;
    //const param=[req.body.userid,req.body.password];

    if(userid.length >0 && password.length >0 ) { //빈칸없이 입력
        db.query('SELECT * FROM user WHERE iduser=?', [userid],(err,rows) => {  //select from where문 db 테이블,속성명 정확히!
            if(rows.length>0){
                if(rows[0].password==password){
                    res.write('<script>window.location="/"</script>'); //성공
                    res.end();
                } 
                else{
                    console.log('비밀번호가 맞지 않습니다.');
                    res.write(`<script type="text/javascript">alert('password does not correct!')</script>`);
                    res.write('<script>window.location="/login"</script>');
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