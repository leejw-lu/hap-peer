const express = require("express");
const router = express.Router();
const db = require("../db");

let proj_id = {
  id: 0
};

router.get('/*', function (req, res) {
  proj_id.id = req.params['0'];
  const sc_id = Date.now() % 2000000;
  const sc_user = req.session.user['userid'];
  const sc_project = proj_id.id;
  const sql = "INSERT INTO scrap (sc_id, sc_user, sc_project) VALUES (?, ?, ?) ";
  const params = [sc_id, sc_user, sc_project];
  //스크랩할때 사용하는 INSERT문을 위한 params
  const params2 = [sc_user, sc_project];
  //조회하는 프로젝트와 유저ID에 일치하는 스크랩ID가 있는지 sql문을 위한 params
  db.query("SELECT * FROM scrap where sc_user = ? and sc_project = ?", params2, function (err, rows) {
    if (rows.length > 0) { //이미 스크랩 했다면
      res.write(`<script type="text/javascript">alert('already exists')</script>`);
      res.write(`<script>window.location="/project_detail/${sc_project}"</script>`);
    }
    else {
      db.query(sql, params, function (err) {
        if (err) console.error(err);
        else { //스크랩하지 않았다면
          res.write(`<script type="text/javascript">alert('successfully bookmarked')</script>`);
          res.write(`<script>window.location="/project_detail/${sc_project}"</script>`);
        }
      })
    }
  })
});

router.post('/*', function (req, res) {
  proj_id.id = req.params['0'];
  const sc_project = proj_id.id;
  const sql = "DELETE FROM scrap WHERE sc_project = ? and sc_user =?";
  //스크랩 삭제
  const params = [sc_project, req.session.user['userid']];
  db.query(sql, params, function (err) {
    if (err) console.error(err);
    else {
      res.write(`<script type="text/javascript">alert('successfully removed')</script>`);
      res.write(`<script>window.location="/project_detail/${sc_project}"</script>`);
    }
  })
}
);

module.exports = router;