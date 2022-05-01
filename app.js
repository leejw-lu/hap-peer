const port=3000;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("초기세팅");
  });

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });