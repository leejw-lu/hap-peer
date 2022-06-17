const express = require("express");
const { NULL } = require("mysql/lib/protocol/constants/types");
const router = express.Router();
const db = require("../db");


router.get('/', function (req, res) {

  let scrap;
  let partPjID = new Array();
  let numEvaluated;
  let numPartPeer;
  let statusEvaluated = new Array();

  if (req.session.user) {
    const sql_scrap = "SELECT p.proj_title, p.proj_id FROM user AS u LEFT OUTER JOIN scrap AS s ON u.user_id = s.sc_user LEFT OUTER JOIN project AS p ON s.sc_project = p.proj_id WHERE u.user_id = ?"
    db.query(sql_scrap, [req.session.user['userid']], function (err, rows) {
      if (err) console.error(err);
      scrap = rows;
      console.log(scrap);
    })

    const sql = "SELECT u.user_info, u.user_stack, u.user_stacketc, u.user_image, p.proj_title, p.proj_id, p.recruit_status, p.develop_status FROM user AS u LEFT OUTER JOIN participate AS pa ON u.user_id = pa.part_user LEFT OUTER JOIN project AS p ON pa.part_project = p.proj_id WHERE u.user_id = ?";
    const sql_evcount = "select count(*) as num from evaluation where ev_rater=? and ev_evaluated= 1 and ev_project= ? "     //평가한 팀원명수
    const sql_toev = "select count(*) as num from evaluation where ev_rater= ? and ev_project=? "     //평가해야할 팀원명수

    const sql_ev = "select avg(ev_value1) as v1, avg(ev_value2) as v2, avg(ev_value3) as v3, avg(ev_value4) as v4, avg(ev_value5) as v5, count(*)as num from evaluation where ev_rated= ? and ev_evaluated=1";

    db.query(sql, [req.session.user['userid']], function (err, rows) {
      if (err) console.error(err);
      for (let i = 0; i < rows.length; i++) {
        partPjID[i] = rows[i].proj_id;
        db.query(sql_evcount, [req.session.user['userid'], partPjID[i]], function (err, Evaluated) {
          if (err) console.error(err);
          numEvaluated = Evaluated[0].num;
          console.log("numEvaluated:" + numEvaluated);
        })
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
      db.query(sql_ev, [req.session.user['userid']], function (err, result) {
        if (err) console.log(err);
        console.log("평가status배열: " + statusEvaluated);
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
        else {
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
