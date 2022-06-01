const express = require("express");
const router = express.Router();
const db = require("../db"); 

router.get('/*', function(req,res){

    const pj_id=[req.params['0']];
    console.log("pj_id: " , pj_id);
    let pj_title;

    //프로젝트 이름 가져오기
    const sql="select proj_title from project where proj_id= ? ";
    db.query(sql,[pj_id], function(err, rows) {
        if(err) console.error("err: ", err);
        pj_title= rows[0].proj_title;
    })

    //유저 (닉네임) join 평가(피평가자,평가유무)
    const sql2="select u.user_nickname, e.ev_rated, e.ev_evaluated from evaluation as e join user as u on e.ev_rated=u.user_id where e.ev_project= ? and e.ev_rater= ? ";
    const params=[pj_id, req.session.user['userid']];

    db.query(sql2,params, function(err, rows) {
        if(err) console.error("err: ", err);

        res.render("evaluation",{
            user_id: params[1],
            pj_id: pj_id,
            pj_title:pj_title,
            rows: rows 
        });
    })

})

router.post('/:pj_id/item', function(req,res){
    //res.send("평가하기 item항목");
    const pj_id = req.body.pj_id;
    const ev_rated=req.body.ev_rated;
    const user_nickname=req.body.user_nickname;

    res.render("evaluation_item",{
        user_id: req.session.user['userid'],
        pj_id: pj_id,
        ev_rated: ev_rated,
        user_nickname:user_nickname
    });

})


router.post('/:pj_id/submit',function(req,res){

    const pj_id=req.body.pj_id;
    const ev_rated=req.body.ev_rated;
    const value1=req.body.ev_value1;
    const value2=req.body.ev_value2;
    const value3=req.body.ev_value3;
    const value4=req.body.ev_value4;
    const value5=req.body.ev_value5;

	const sql= 
    "UPDATE evaluation SET ev_evaluated=1, ev_value1=?, ev_value2=?, ev_value3=? ,ev_value4=? ,ev_value5=? WHERE ev_project =? AND ev_rater=? AND ev_rated=? ";
    const params=[value1,value2,value3,value4,value5,pj_id, req.session.user['userid'],ev_rated];

    db.query(sql,params,function(err) { 
        if (err) console.error("err : " + err);
        else{
            console.log("평점정보:", params);
            //res.write(`<script type="text/javascript">alert('evaluation has been completed!')</script>`);
            return res.redirect("/evaluation/"+pj_id);
        }
    })
})

//꼭 해주기
module.exports = router;