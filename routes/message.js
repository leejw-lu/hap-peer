const express = require("express");
const router = express.Router();
const db = require("../db");

//쪽지 송신자,수신자 모두 삭제했으면 db에도 삭제하기
//언제삭제? -> 바로 삭제는 아니고 node app.js 다시하면 삭제된다..
const sql= "delete FROM message WHERE delete_sender = 1 and delete_receiver= 1 ";
    db.query(sql, function(err, rows) {
        if(err) console.error("err: ", err);
        console.log("deleted from message db");
    });

router.get('/', function(req,res) {

    if(req.session.user){  //로그인 후 쪽지 사용가능
        //받은쪽지함 list 보이게 하기
        const sql= "SELECT * FROM message WHERE m_receiver = ? and delete_receiver=0 ";
        db.query(sql,[req.session.user['userid']], function(err, rows) {
            if(err) console.error("err: ", err);
            res.render("message",{ 
                user_id: req.session.user['userid'], 
                rows: rows});
        });
        
    } else{
        res.write(`<script type="text/javascript">alert('Available after login!')</script>`);
        res.write('<script>window.location="/"</script>');
    }
})




module.exports=router;