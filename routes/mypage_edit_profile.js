const express = require("express");
const { NULL } = require("mysql/lib/protocol/constants/types");
const { connect } = require("../db");
const router = express.Router();
const db = require("../db"); //디비연결
const multer = require('multer');
const path = require('path');

router.get('/', function (req, res) {
  if (req.session.user) {
    //로그인한 유저의 소개, 스택, 이미지, 기타스택 받아오기 (기존 값 보여주기 위함)
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

//이미지 업로드를 위한 multer
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

//수정 시 1개의 이미지만 업로드를 허용
router.post('/', upload.single('img'), function (req, res) {
  let userInfo = req.body.userInfo;
  let userStack = "";
  let userStacketc = req.body.etc;
  if (req.body.skillstack instanceof Array) {
    req.body.skillstack.forEach(element => {
      userStack = userStack + element;
    });
  }
  //skillstack 배열로 받아서 스트링으로 합치기
  else { userStack = req.body.skillstack; }
  //로그인한 유저가 수정한 소개, 스택, 이미지, 기타스택 DB에 업데이트
  //이미지를 수정하지 않을 경우 자동으로 default 유저 이미지 경로로 저장
  //skillstack 한개만 선택된 경우 배열로 인식되지 않아 바로 userstack에 넣음
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
