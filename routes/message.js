const express = require("express");
const router = express.Router();
const db = require("../db");

router.get('/', function(req,res) {

    if(req.session.user){  //로그인 후 쪽지 사용가능
        res.render("message");

    } else{
        res.write(`<script type="text/javascript">alert('Available after login!')</script>`);
        res.write('<script>window.location="/"</script>');
    }
})

module.exports=router;