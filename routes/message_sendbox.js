const express = require("express");
const router = express.Router();
const db = require("../db");

router.get('/', function(req,res) {
    //로그인을 해야 쪽지box를 확인할 수 있으므로 req.session.user 따로 확인안해도 된다.
    //보낸쪽지함 list 보이게 하기
    const sql= "SELECT * FROM message WHERE m_sender = ? and delete_sender= 0 ";
    db.query(sql,[req.session.user['userid']], function(err, rows) {
        if(err) console.error("err: ", err);
        res.render("message_sendbox",{ 
            user_id: req.session.user['userid'], 
            rows: rows});
    });

    } 
)

module.exports=router;