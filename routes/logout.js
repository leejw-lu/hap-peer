const express = require("express");
const router = express.Router();

router.get('/', function(req,res) {
    if(req.session.user){
        console.log('로그아웃');
        req.session.destroy(function(err){
            if(err) throw err;
            console.log('세션 삭제하고 로그아웃됨');
            res.write(`<script type="text/javascript">alert('Success logout.')</script>`);
            res.write('<script>window.location="/"</script>');
            //res.redirect('/');
        });
    }
    else{
        console.log('로그인 상태 아님');
        res.write(`<script type="text/javascript">alert('Fail logout')</script>`);
        res.write('<script>window.location="/"</script>');
    }
})

module.exports=router;