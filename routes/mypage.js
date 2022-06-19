const express = require("express");
const { NULL } = require("mysql/lib/protocol/constants/types");
const router = express.Router();
const db = require("../db");


router.get('/', function (req, res) {

  let scrap;  //scrap한 정보 객체 담기
  let partPjID = new Array();   //참여프로젝트id 배열
  let numEvaluated;
  let numPartPeer;
  let statusEvaluated = new Array();  //참여한 프로젝트 평가모두 완료했는지 확인 배열

  if (req.session.user) {
    const sql_scrap = "SELECT p.proj_title, p.proj_id FROM user AS u LEFT OUTER JOIN scrap AS s ON u.user_id = s.sc_user LEFT OUTER JOIN project AS p ON s.sc_project = p.proj_id WHERE u.user_id = ?"
    //유저 아이디에 일치하는 스크랩DB를 불러오고, 프로젝트 테이블에서 스크랩DB에서 불러온 프로젝트ID를 이용해 프로젝트제목 가져오기
    db.query(sql_scrap, [req.session.user['userid']], function (err, rows) {
      if (err) console.error(err);
      scrap = rows;
    })

    // (유저프로필 정보, 참여) + 평점 정보 받아오기
    const sql = "SELECT u.user_info, u.user_stack, u.user_stacketc, u.user_image, p.proj_title, p.proj_id, p.recruit_status, p.develop_status FROM user AS u LEFT OUTER JOIN participate AS pa ON u.user_id = pa.part_user LEFT OUTER JOIN project AS p ON pa.part_project = p.proj_id WHERE u.user_id = ?"; //유저프로필 정보, 참여 정보
    const sql_evcount = "select count(*) as num from evaluation where ev_rater=? and ev_evaluated= 1 and ev_project= ? "     //평가한 팀원명수
    const sql_toev = "select count(*) as num from evaluation where ev_rater= ? and ev_project=? "     //평가해야할 팀원명수

    const sql_ev = "select avg(ev_value1) as v1, avg(ev_value2) as v2, avg(ev_value3) as v3, avg(ev_value4) as v4, avg(ev_value5) as v5, count(*)as num from evaluation where ev_rated= ? and ev_evaluated=1";

    //유저프로필 정보, 참여 정보 받아오기
    db.query(sql, [req.session.user['userid']], function (err, rows) {
      if (err) console.error(err);
      for (let i = 0; i < rows.length; i++) {
        partPjID[i] = rows[i].proj_id;
        db.query(sql_evcount, [req.session.user['userid'], partPjID[i]], function (err, Evaluated) {
          if (err) console.error(err);
          numEvaluated = Evaluated[0].num;
        })
        //평가하기 버튼 or 평가완료 text
        db.query(sql_toev, [req.session.user['userid'], partPjID[i]], function (err, PartPeer) {
          if (err) console.error(err);
          numPartPeer = PartPeer[0].num;
          if (numEvaluated == numPartPeer) {  //평가테이블에서 해당프로젝트에 참여한 사용자가 평가한 팀원수== 해당프로젝트에 참여한 팀원수(자신제외)
            statusEvaluated[i] = "평가완료"
          }
          else {
            statusEvaluated[i] = "평가하기"
          }
        })
      }
      //평가테이블에서 해당유저 평가값 받기
      db.query(sql_ev, [req.session.user['userid']], function (err, result) {
        if (err) console.log(err);
        if (result.length > 0) {
          res.render("mypage", {
            user_id: req.session.user['userid'],
            user_nickname: req.session.user['nickname'],
            rows: rows,
            rows2: scrap,
            ev_value: result[0],
            statusEvaluated: statusEvaluated
          });
        }
        else { //아직 평가테이블에 해당유저 정보 X
          res.render("mypage", {
            user_id: req.session.user['userid'],
            user_nickname: req.session.user['nickname'],
            rows: rows,
            rows2: scrap,
            ev_value: "정보없음",
            statusEvaluated: statusEvaluated
          });
        }
      })
    })
  } else {
    res.write(`<script type="text/javascript">alert('Log in to access that page')</script>`);
    res.write('<script>window.location="/login"</script>');
  }
})

module.exports = router;
