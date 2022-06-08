const express = require("express");
const router = express.Router();
const db = require("../db");

let proj_id = {
  id: 0
};

router.get('/*', function (req, res) {
  const sql = 'SELECT * FROM project WHERE proj_id=?';
  const sql_parti = 'SELECT * FROM participate WHERE part_project=?';
  const sql2 = 'SELECT * FROM project LEFT OUTER JOIN scrap ON (proj_id = sc_project and sc_user = ?) where proj_id = ?';
  proj_id.id = req.params['0'];

  db.query(sql, [proj_id.id], function (err, res) {
    if (err)
      console.log(err);
    if (res[0].recruit_status == 1) {
      db.query(sql_parti, proj_id.id, function (error, result) {
        for (let i = 0; i < result.length; i++) {
          for (let j = 0; j < result.length; j++) {
            const insert_sql = `INSERT INTO evaluation (ev_project, ev_rater, ev_rated) VALUES (?, ?, ?)`;
            const insert_params = [proj_id.id, result[i].part_user, result[j].part_user];
            if (i != j) {
              db.query(insert_sql, insert_params, function (error_, insert_res) { });
            }
          }
        }
      })
    }
  })

  db.query(sql_parti, proj_id.id, function (error, part_res) {
    if (error) console.log(error);
    if (req.session.user) {
      db.query(sql2, [req.session.user['userid'], proj_id.id], function (err, results) {
        return res.render("project_detail", {
          user_id: req.session.user['userid'],
          project_detail: results[0],
          part_proj: part_res
        });
      })
    }
    else {
      db.query(sql, [proj_id.id], function (err, results) {
        return res.render("project_detail", {
          user_id: "비회원",
          project_detail: results[0],
          part_proj: part_res
        });
      })
    }
  });
});

router.post('/*', function (req, res) {
  const proj = proj_id.id;
  const member = req.body.member;
  const sql = "INSERT INTO participate (part_user, part_project) VALUES (?, ?)";
  const params = [member, proj];
  db.query("SELECT * FROM user WHERE user_id = ?", [member], function (err, rows) {
    if (rows.length > 0) {
      db.query(`SELECT * FROM participate WHERE part_user=? AND part_project=?`, [member, proj], function (error, row) {
        if (error) console.error("err : " + error);
        if (row.length > 0) {
          res.write(`<script type="text/javascript">alert('Member already exit!')</script>`);
          res.write(`<script>window.location="/project_detail/${proj_id.id}"</script>`);
        }
        else {
          db.query(sql, params, function (err) {
            if (err) console.error("err : " + err);
            else {
              res.write(`<script type="text/javascript">alert('Success!')</script>`);
              res.write(`<script>window.location="/project_detail/${proj_id.id}"</script>`);
            }
          })
        }
      })
    }
    else {
      console.log(err);
      res.write(`<script type="text/javascript">alert('Member ID does not exit!')</script>`);
      res.write(`<script>window.location="/project_detail/${proj_id.id}"</script>`);
    }
  })
});

module.exports = router;