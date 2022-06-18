const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");

router.get('/', function (req, res) {
  res.render("sign_up");
})

router.post("/", function (req, res) {
  const userid = req.body.userid;
  const password = req.body.password;
  const check_pw = req.body.check_pw;
  const nickname = req.body.nickname;
  const passwordBy = bcrypt.hashSync(password, 5);
  //const image = req.body.image;

  const sql = "INSERT INTO user (user_id, user_password, user_nickname, user_image, user_stack, user_stacketc) VALUES (?, ?, ?, ?, ?, ?)";
  const params = [userid, passwordBy, nickname, '/public/images/default_user_image.png', " ", ""]

  if (userid.length > 0 && password.length > 0 && check_pw.length > 0 && nickname.length > 0) { //빈칸없이 입력
    if (password == check_pw) { //비밀번호 재확인
      db.query(sql, params, function (err) {
        if (err) {  //이미 존재하는 아이디(중복체크)
          console.log(err);
          res.write(`<script type="text/javascript">alert('Duplicate ID!')</script>`);
          res.write('<script>window.location="/sign_up"</script>');
        } else {  //회원가입성공
          res.write(`<script type="text/javascript">alert('You have successfully registered!!')</script>`);
          res.write('<script>window.location="/login"</script>');
          res.end();
        }
      })
    } else {
      res.write(`<script type="text/javascript">alert('Password is incorrect')</script>`);
      res.write('<script>window.location="/sign_up"</script>');
    }
  } else {
    res.write(`<script type="text/javascript">alert('Fill in blanks')</script>`);
    res.write('<script>window.location="/sign_up"</script>');
  }
})

module.exports = router;