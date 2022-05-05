const port=3001;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//layouts = require("express-ejs-layouts");

//라우터 세팅
const loginRouter=require("./routes/login");
const signupRouter=require("./routes/signup");

app.set('views', __dirname + '/views');
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}));
app.use(express.json());
//app.use(layouts);
//app.use(express.static("public"));

app.get("/", (req, res) => { res.render("main"); });

app.use("/login",loginRouter);
app.use("/signup",signupRouter);


app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });