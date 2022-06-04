const express = require("express");
const { NULL } = require("mysql/lib/protocol/constants/types");
const router = express.Router();
const db = require("../db"); //디비연결
const multer = require("multer");
const path = require("path");

router.get('/', function(req,res) {

    let scrap;  //scrap한 정보 객체 담기

    if(req.session.user){  //로그인 되어있는가?

        const sql_scrap = "SELECT p.proj_title, p.proj_id FROM user AS u LEFT OUTER JOIN scrap AS s ON u.user_id = s.sc_user LEFT OUTER JOIN project AS p ON s.sc_project = p.proj_id WHERE u.user_id = ?"
        //스크랩된 프로젝트 정보 담긴 rows를 scrap에 대입.
        db.query(sql_scrap, [req.session.user['userid']],  function(err, rows){
            if (err) console.error("err: ", err);
            scrap= rows;
            console.log(scrap);
        })

        const sql = "SELECT u.user_info, u.user_stack, u.user_image, p.proj_title, p.proj_id, p.recruit_status, p.develop_status FROM user AS u LEFT OUTER JOIN participate AS pa ON u.user_id = pa.part_user LEFT OUTER JOIN project AS p ON pa.part_project = p.proj_id WHERE u.user_id = ?";
        const sql_ev="select avg(ev_value1) as v1, avg(ev_value2) as v2, avg(ev_value3) as v3, avg(ev_value4) as v4, avg(ev_value5) as v5, count(*)as num from evaluation where ev_rated= ? and ev_evaluated=1";
        // (유저프로필 정보, 참여) + 평점 정보 받아오기

        db.query(sql, [req.session.user['userid']], function(err, rows) {
            if(err) console.error("err: ", err);
            console.log(rows);
            
            db.query(sql_ev,[req.session.user['userid']],function(err,result){		//평가table에서 유저정보 확인
                if (err) console.log(err);
                if(result.length > 0 ){
                    res.render("mypage",{
                        user_id: req.session.user['userid'],
                        user_nickname: req.session.user['nickname'], 
                        rows: rows,     //유저프로필+ 참여정보 
                        rows2: scrap,   //스크랩정보
                        ev_value: result[0]
                    });
                }
                else{                   //평가table에 피평가id없음 + 평가table에 있지만 아직 평가 전 (이것땜에 join할수없다.)
                    res.render("mypage",{
                        user_id: req.session.user['userid'],
                        user_nickname: req.session.user['nickname'], 
                        rows: rows,     //유저프로필+ 참여정보 
                        rows2: scrap,   //스크랩정보
                        ev_value: "정보없음"
                    });     
                }
    
            })
        })

    } else{     //로그인하지 않고 접근한 경우
        console.log('로그인이 필요합니다.');
        res.write(`<script type="text/javascript">alert('Log in to access that page')</script>`);
        res.write('<script>window.location="/login"</script>');
    }

})

module.exports = router;
