const express = require("express");
const router = express.Router();
const db = require("../db"); 

router.get('/', function(req,res){
    res.render("message_send",{
        user_id: req.session.user['userid'],    //쪽지보낸사람 id 보내기
        receiver:"직접입력"
    });
})

router.post('/reply', function(req,res){
    const m_sender = req.body.m_sender; 
    //console.log(m_sender);
    res.render("message_send",{
        user_id: req.session.user['userid'],    //쪽지보낸사람 id 보내기
        receiver:m_sender                      //보낸사람에게 답장 보내기
    });
})

router.post('/',function(req,res) {
    const sender=req.session.user['userid'];
    const receiver=req.body.receiver;
    const type=req.body.message_type;
    const content=req.body.message_content;
    const date=new Date();
    
    //db에 쪽지내용 insert
    const sql="INSERT INTO message (m_sender, m_receiver, m_type, m_content, m_date) VALUES (?, ?, ?, ?, ? )";
    const params=[sender,receiver,type, content,date];

    if (receiver.length > 0 && content.length>0 ){
        db.query("SELECT * FROM user WHERE user_id = ?", [receiver], function(err,rows) {    //받는사람이 user테이블에 있는지 확인해야한다.
             if (rows.length>0) {   //receiver 존재! -> db에 저장
                db.query(sql,params,function(err) { 
                    if (err) console.error("err : " + err);
                    else{
                        console.log(params);
                        res.write(`<script type="text/javascript">alert('message sent successfully!')</script>`);
                        res.write('<script>window.location="/message"</script>');
                    }
                })
              }
            else{ //receiver존재X
                console.log(err);
                console.log("receiver 존재하지 않음");
                res.write(`<script type="text/javascript">alert('Receiver ID does not exit!')</script>`);
                res.write('<script>window.location="/message_send"</script>'); 
            }
    }) }
    else{
        //빈칸입력시
        res.write(`<script type="text/javascript">alert('Fill in blanks')</script>`);
        res.write('<script>window.location="/message_send"</script>'); 
    }
})

//꼭 해주기
module.exports = router;