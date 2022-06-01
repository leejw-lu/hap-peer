const express = require("express");
const { NULL } = require("mysql/lib/protocol/constants/types");
const router = express.Router();
const db = require("../db"); //디비연결

router.get('/', function (req, res) {
    if (req.session.user) {  //로그인 되어있는가?
        const sql = 'SELECT * FROM user';
        db.query(sql, function (err, results) {
            if (err)
                console.log(err);
            return res.render("user_list", {
                user_id: req.session.user['userid'],
                user_nickname: req.session.user['nickname'],
                user_list: results
            });
        })
    } else {  //로그인하지 않고 접근한 경우
        // console.log('로그인이 필요합니다.');
        // res.write(`<script type="text/javascript">alert('Log in to access that page')</script>`);
        // res.write('<script>window.location="/login"</script>');
        const sql = 'SELECT * FROM user';
        db.query(sql, function (err, results) {
            if (err)
                console.log(err);
            return res.render("user_list", {
                user_id: "비회원",
                user_nickname: " ",
                user_list: results
            });
        })
    }
});


module.exports = router;
