const express = require("express");
const router = express.Router();
const db = require("../db");

router.get('/*', function (req, res, next) {
  const sql = "SELECT * FROM message WHERE m_id= ? ";
  db.query(sql, [req.params['0']], function (err, results) {
    if (err)
      console.log(err);
    res.render("message_detail", {
      user_id: req.session.user['userid'],
      message_detail: results[0]
    });
  })
});

router.post('/*/delete', function (req, res) {
  const m_id = req.body.m_id;
  const userid = req.session.user['userid'];

  const sql = "select * from message where m_id =? and m_sender=?";
  const params = [m_id, userid];

  const sql2 = "update message set delete_sender=1 where m_id =? ";
  const sql3 = "update message set delete_receiver=1 where m_id =? ";

  db.query(sql, params, function (err, result) {
    if (err) console.error(err);

    if (result.length > 0) {
      db.query(sql2, [m_id], function (err, result) {
        if (err) console.error("err : " + err);
        else {
          res.write(`<script type="text/javascript">alert('message was successfully deleted!')</script>`);
          res.write('<script>window.location="/message_sendbox"</script>');
        }
      });
    }
    else {
      db.query(sql3, [m_id], function (err, result) {
        if (err) console.error("err : " + err);
        else {
          res.write(`<script type="text/javascript">alert('message was successfully deleted!')</script>`);
          res.write('<script>window.location="/message"</script>');
        }
      });
    }
  });
});

module.exports = router;