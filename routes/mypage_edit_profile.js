const express = require("express");
const { NULL } = require("mysql/lib/protocol/constants/types");
const { connect } = require("../db");
const router = express.Router();
const db = require("../db"); //디비연결
const multer = require('multer');
const path = require('path');

router.get('/', function (req, res) {
  if (req.session.user) {
    const sql = "SELECT user_info, user_stack, user_image, user_stacketc FROM user WHERE user_id = ?";
    db.query(sql, [req.session.user['userid']], function (err, rows) {
      if (err) console.error(err);
      res.render("mypage_edit_profile", {
        user_id: req.session.user['userid'],
        user_nickname: req.session.user['nickname'], rows: rows
      });
    })
  } else {
    res.write(`<script type="text/javascript">alert('Log in to access that page')</script>`);
    res.write('<script>window.location="/login"</script>');
  }
})

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, 'uploads/')
    },
    filename: function (req, file, callback) {
      callback(null, new Date().valueOf() + path.extname(file.originalname))
    }
  }),
})

router.post('/', upload.single('img'), function (req, res) {
  let userInfo = req.body.userInfo;
  let userStack = "";
  let userStacketc = "";
  if (req.body.skillstack instanceof Array) {
    req.body.skillstack.forEach(element => {
      userStack = userStack + element;
    });
  }
  else { userStack = req.body.skillstack; }
  if (typeof req.body.etc != 'undefined') userStacketc = req.body.etc
  if (!userStack) { userStack = ""; }
  let userImage = req.file == undefined ? '/public/images/default_user_image.png' : req.file.path;
  const sql = "UPDATE user SET user_info=?, user_stack=?, user_image=?, user_stacketc=? WHERE user_id=?";
  const params = [userInfo, userStack, userImage, userStacketc, req.session.user['userid']]
  db.query(sql, params, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.write(`<script type="text/javascript">alert('Edit Successful')</script>`);
      res.write('<script>window.location="/mypage"</script>');
      res.end();
    }
  })
})

module.exports = router;
