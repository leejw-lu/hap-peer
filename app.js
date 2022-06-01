const port=3001;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser=require("cookie-parser");
const expressSession=require("express-session");
const layouts = require("express-ejs-layouts");

//라우터 세팅
const mainRouter=require("./routes/main");
const loginRouter=require("./routes/login");
const signupRouter=require("./routes/signup");
const logoutRouter=require("./routes/logout");

const messageRouter=require("./routes/message");
const messagesendRouter=require("./routes/message_send");
const messageSendBoxRouter=require("./routes/message_sendbox");
const messageDetailRouter=require("./routes/message_detail");

const mypageRouter=require("./routes/mypage");
const mypageEditProfileRouter=require("./routes/mypage_edit_profile");

const projectRegisterRouter=require("./routes/project_regist");
const projectDetailRouter=require("./routes/project_detail");
const projectSortRouter=require("./routes/project_sort");

const userListRouter=require("./routes/user_list");
const userPageRouter=require("./routes/user_page");
const projectEditRouter=require("./routes/project_edit");
const scrapRouter=require("./routes/scrap");
const evaluationRouter=require("./routes/evaluation");

//app.use(express.static(__dirname + "/public"));
app.set('views', __dirname + '/views');
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(layouts);
app.use('/uploads',express.static(__dirname+'/uploads'));
app.use('/js', express.static('./src/js'));
app.use('/css', express.static('./src/css'));


//로그인 세션유지
app.use(cookieParser());
app.use(expressSession({
  secret: 'my key',
  resave: true,
  saveUninitialized: true
}));

//라우팅
app.use("/",mainRouter);
app.use("/login",loginRouter);
app.use("/signup",signupRouter);
app.use("/logout",logoutRouter);
app.use("/message",messageRouter);
app.use("/message_send",messagesendRouter);
app.use("/message_sendbox",messageSendBoxRouter);
app.use("/message_detail",messageDetailRouter);
app.use("/mypage",mypageRouter);
app.use("/mypage_edit_profile",mypageEditProfileRouter);
app.use("/project_regist",projectRegisterRouter);
app.use("/project_detail",projectDetailRouter);
app.use("/project_sort",projectSortRouter);
app.use("/user_list",userListRouter);
app.use("/user_page",userPageRouter);
app.use("/project_edit",projectEditRouter);
app.use("/scrap", scrapRouter);
app.use("/evaluation",evaluationRouter);
// app.get("project_regist", (req, res) => {res.render('/project_regist', {})});



app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });