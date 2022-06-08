const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");

router.get('/', function (req, res) {
  if (req.session.user) {
    res.write('<script>window.location="/"</script>');
  } else {
    res.render("login");
  }
})

router.post('/', function (req, res) {
  const userid = req.body.userid;
  const password = req.body.password;

  if (userid.length > 0 && password.length > 0) {
    db.query('SELECT * FROM user WHERE user_id =?', [userid], (err, rows) => {
      if (rows.length > 0) {
        bcrypt.compare(password, rows[0].user_password, (err, result) => {
          if (result) {
            req.session.user = {
              userid: rows[0].user_id,
              nickname: rows[0].user_nickname,
              authorized: true
            };
            res.write('<script>window.location="/"</script>');
            res.end();
          }
          else {
            res.write(`<script type="text/javascript">alert('password does not correct!')</script>`);
            res.write('<script>window.location="/login"</script>');
          }
        })
      }
      else {
        res.write(`<script type="text/javascript">alert('ID does not exist!')</script>`);
        res.write('<script>window.location="/login"</script>');
      }
    })
  }
  else {
    res.write(`<script type="text/javascript">alert('Fill in blanks')</script>`);
    res.write('<script>window.location="/login"</script>');
  }
})

module.exports = router;