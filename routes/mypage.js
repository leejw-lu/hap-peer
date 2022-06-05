const express = require("express");
const { NULL } = require("mysql/lib/protocol/constants/types");
const router = express.Router();
const db = require("../db"); //디비연결
const multer = require("multer");


router.get('/', function(req,res) {

    let scrap;  //scrap한 정보 객체 담기
    let partPjID=new Array();   //참여프로젝트id 배열
    let numEvaluated;
    let numPartPeer;
    let statusEvaluated=new Array();    //참여한 프로젝트 평가모두 완료했는지 확인 배열

    if(req.session.user){  //로그인 되어있는가?

        const sql_scrap = "SELECT p.proj_title, p.proj_id FROM user AS u LEFT OUTER JOIN scrap AS s ON u.user_id = s.sc_user LEFT OUTER JOIN project AS p ON s.sc_project = p.proj_id WHERE u.user_id = ?"
        //스크랩된 프로젝트 정보 담긴 rows를 scrap에 대입.
        db.query(sql_scrap, [req.session.user['userid']],  function(err, rows){
            if (err) console.error("err: ", err);
            scrap= rows;
            console.log(scrap);
        })

        // (유저프로필 정보, 참여) + 평점 정보 받아오기
        const sql = "SELECT u.user_info, u.user_stack, u.user_image, p.proj_title, p.proj_id, p.recruit_status, p.develop_status FROM user AS u LEFT OUTER JOIN participate AS pa ON u.user_id = pa.part_user LEFT OUTER JOIN project AS p ON pa.part_project = p.proj_id WHERE u.user_id = ?";
        
        const sql_evF="select count(*) as num from evaluation where ev_rater=? and ev_evaluated= 1 and ev_project= ? "
        const sql_part="select count(*) as num from participate where part_project= ? "
        
        const sql_ev="select avg(ev_value1) as v1, avg(ev_value2) as v2, avg(ev_value3) as v3, avg(ev_value4) as v4, avg(ev_value5) as v5, count(*)as num from evaluation where ev_rated= ? and ev_evaluated=1";

        db.query(sql, [req.session.user['userid']], function(err, rows) {   //sql: 참여프로젝트 조회
            if(err) console.error("err: ", err);
            console.log(rows);

            //참여한 프로젝트들 pj_id얻어 해당프로젝트에 참여한 팀원들 모두 평가했는지 확인
            for(let i=0; i<rows.length; i++){       
                partPjID[i]=rows[i].proj_id;
                console.log("partPJID 40행"+ partPjID[i]);

                db.query(sql_evF,[req.session.user['userid'], partPjID[i]],function(err,Evaluated){
                    if(err) console.error("err: ", err);
                    numEvaluated=Evaluated[0].num;
                    console.log("numEvaluated:"+ numEvaluated);
                })

                //해당 프로젝트의 참여인원(1) 개수 받기
                db.query(sql_part,[partPjID[i]],function(err,PartPeer){
                    if(err) console.error("err: ", err);
                    numPartPeer=PartPeer[0].num;
                    console.log("numPartPeer:"+numPartPeer);

                    //해당프로젝트에 참여한 팀원들 모두 평가완료했는지 확인
                    if(numEvaluated==(numPartPeer-1)){   //part인원에 자기자신 제외하기
                        statusEvaluated[i]="평가완료"
                    }
                    else{   //아직 평가전, 평가 진행중
                        statusEvaluated[i]="평가하기"
                    }
                
                })

            }
            
            //평가table조회 후 mypage로 프로필,스크랩,참여,평가완료여부 모두 넘기기
            db.query(sql_ev,[req.session.user['userid']],function(err,result){	//sql_ev: 평가table에서 유저정보 확인
                if (err) console.log(err);
                console.log("평가status배열: "+ statusEvaluated);

                if(result.length > 0 ){     //평가table에 유저정보
                    res.render("mypage", {
                        user_id: req.session.user['userid'],
                        user_nickname: req.session.user['nickname'], 
                        rows: rows,             //유저프로필+ 참여정보 
                        rows2: scrap,           //스크랩정보
                        ev_value: result[0],    //평점정보
                        statusEvaluated: statusEvaluated    //평가모두 완료했는지 여부
                    });
                }
                else{                   //평가table에 피평가id없음 + 평가table에 있지만 아직 평가받은정보 x (이것땜에 join할수없다.)
                    res.render("mypage", {
                        user_id: req.session.user['userid'],
                        user_nickname: req.session.user['nickname'], 
                        rows: rows,         //유저프로필+ 참여정보 
                        rows2: scrap,       //스크랩정보
                        ev_value: "정보없음", //평점정보
                        statusEvaluated: statusEvaluated //평가모두 완료했는지 여부
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
