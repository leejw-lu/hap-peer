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
  const params2 = [sc_user, sc_project];
  db.query("SELECT * FROM scrap where sc_user = ? and sc_project = ?", params2, function (err, rows) {
    if (rows.length > 0) {
      res.write(`<script type="text/javascript">alert('already exists')</script>`);
      res.write('<script>window.location="/project_sort"</script>');
    }
    else {
      db.query(sql, params, function (err) {
        if (err) console.error(err);
        else {
          res.write(`<script type="text/javascript">alert('successfully bookmarked')</script>`);
          res.write('<script>window.location="/project_sort"</script>');
        }
      })
    }
  })
});

router.post('/*', function (req, res) {
  proj_id.id = req.params['0'];
  const sc_project = proj_id.id;
  const sql = "DELETE FROM scrap WHERE sc_project = ? and sc_user =?";
  const params = [sc_project, req.session.user['userid']];
  db.query(sql, params, function (err) {
    if (err) console.error(err);
    else {
      res.write(`<script type="text/javascript">alert('successfully removed')</script>`);
      res.write('<script>window.location="/project_sort"</script>');
    }
  })
}
);

module.exports = router;