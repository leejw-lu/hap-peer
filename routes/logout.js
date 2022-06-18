const express = require("express");
const router = express.Router();

router.get('/', function (req, res) {
  if (req.session.user) {
    req.session.destroy(function (err) {
      if (err) throw err;
      res.write(`<script type="text/javascript">alert('Success logout.')</script>`);
      res.write('<script>window.location="/"</script>');
    });
  }
  else {
    res.write(`<script type="text/javascript">alert('Fail logout')</script>`);
    res.write('<script>window.location="/"</script>');
  }
})

module.exports = router;