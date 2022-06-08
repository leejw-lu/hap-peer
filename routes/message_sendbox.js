const express = require("express");
const router = express.Router();
const db = require("../db");

router.get('/', function (req, res) {
  const sql = "SELECT * FROM message WHERE m_sender = ? and delete_sender= 0 ";
  db.query(sql, [req.session.user['userid']], function (err, rows) {
    if (err) console.error(err);
    res.render("message_sendbox", {
      user_id: req.session.user['userid'],
      rows: rows
    });
  });
}
)

module.exports = router;