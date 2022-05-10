const express = require("express");
const router = express.Router();
const db = require("../db"); 

router.get('/', function(req,res){
    res.render("message_send",{
        sender: req.session.user['userid']    //쪽지보낸사람 id 보내기
    });
})

router.post('/',function(req,res) {
    const sender=req.session.user['userid'];
    const receiver=req.body.receiver;
    const content=req.body.message_content;
    const date=new Date();

    //db에 쪽지내용 insert
    const sql="INSERT INTO message (idsender, idreceiver, m_content, m_date) VALUES (?, ?, ?, ? )";
    const params=[sender,receiver,content,date];

    if (receiver.length > 0 && content.length>0 ){
        db.query("SELECT * FROM user WHERE iduser = ?", [receiver], function(err,rows) {    //받는사람이 user테이블에 있는지 확인해야한다.
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