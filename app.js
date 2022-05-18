const port=3001;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser=require("cookie-parser");
const expressSession=require("express-session");
//layouts = require("express-ejs-layouts");

//라우터 세팅
const mainRouter=require("./routes/main");
const loginRouter=require("./routes/login");
const signupRouter=require("./routes/signup");
const logoutRouter=require("./routes/logout");
const messageRouter=require("./routes/message");
const messagesendRouter=require("./routes/message_send");
const messageSendBoxRouter=require("./routes/message_sendbox");
const mypageRouter=require("./routes/mypage");
const mypageEditProfileRouter=require("./routes/mypage_edit_profile");

//app.use(express.static(__dirname + "/public"));
app.set('views', __dirname + '/views');
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}));
app.use(express.json());
//app.use(layouts);
app.use('/uploads',express.static(__dirname+'/uploads')); 


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
app.use("/mypage",mypageRouter);
app.use("/mypage_edit_profile",mypageEditProfileRouter);


app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });