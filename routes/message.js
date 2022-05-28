const express = require("express");
const router = express.Router();
const db = require("../db");

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