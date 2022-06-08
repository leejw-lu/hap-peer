const express = require("express");
const router = express.Router();
const db = require("../db");

router.get('/', function (req, res) {
  const sql_delete = "delete FROM message WHERE delete_sender = 1 and delete_receiver= 1 ";
  db.query(sql_delete, function (err) {
    if (err) console.error(err);
  });
  if (req.session.user) {
    const sql = "SELECT * FROM message WHERE m_receiver = ? and delete_receiver=0 ";
    db.query(sql, [req.session.user['userid']], function (err, rows) {
      if (err) console.error("err: ", err);
      res.render("message", {
        user_id: req.session.user['userid'],
        rows: rows
      });
    });
  } else {
    res.write(`<script type="text/javascript">alert('Available after login!')</script>`);
    res.write('<script>window.location="/"</script>');
  }
})




module.exports = router;