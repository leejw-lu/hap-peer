const express = require("express");
const router = express.Router();
const db = require("../db");

//쪽지보내기-받는사람 직접입력
router.get('/', function (req, res) {
  res.render("message_send", {
    user_id: req.session.user['userid'],
    receiver: "직접입력"
  });
})

//쪽지보내기-sender에게 답장
router.post('/reply', function (req, res) {
  const m_sender = req.body.m_sender;
  res.render("message_send", {
    user_id: req.session.user['userid'],
    receiver: m_sender
  });
})

router.post('/', function (req, res) {
  const sender = req.session.user['userid'];
  const receiver = req.body.receiver;
  const type = req.body.message_type;
  const content = req.body.message_content;
  const date = new Date();

  const sql = "INSERT INTO message (m_sender, m_receiver, m_type, m_content, m_date) VALUES (?, ?, ?, ?, ? )";
  const params = [sender, receiver, type, content, date];

  if (receiver.length > 0 && content.length > 0) {
    db.query("SELECT * FROM user WHERE user_id = ?", [receiver], function (err, rows) {
      if (rows.length > 0) {  //받는사람ID 존재하는지 확인
        db.query(sql, params, function (err) {
          if (err) console.error(err);
          else {
            res.write(`<script type="text/javascript">alert('message sent successfully!')</script>`);
            res.write('<script>window.location="/message"</script>');
          }
        })
      }
      else {
        res.write(`<script type="text/javascript">alert('Receiver ID does not exit!')</script>`);
        res.write('<script>window.location="/message_send"</script>');
      }
    })
  }
  else {
    res.write(`<script type="text/javascript">alert('Fill in blanks')</script>`);
    res.write('<script>window.location="/message_send"</script>');
  }
})

module.exports = router;