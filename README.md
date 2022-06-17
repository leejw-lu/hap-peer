# HAP-PEER 🥰

프로젝트 개발 동료를 찾기 위한 가장 행복한 방법 ,
<br>
HAP-PEER!

1. 프로필 설정<br>
프로필 사진, 자기 소개, 기술스택까지 작성할 수 있는 프로필!<br>
내가 스크랩 한 글과 참여중인 프로젝트까지 한눈에 👀
<br> <이미지>
2. 프로젝트 등록<br>
  하고 싶은 프로젝트가 있는데 누구랑 해야 하지? 어렵진 않지만 처음 해보는거라 같이 공부하면서 해보고싶다! 🤓<br>
  <이미지> <br>
  ![]()
  난이도와 원하는 기술스택까지 작성하여 나와 딱 맞는 동료 찾기🥰
3. 검색<br>
  원하는 난이도로 검색, 기술 스택으로 검색, 아이디로 검색, 제목으로 검색까지! 다양한 키워드로 원하는 프로젝트와 사용자를 검색하기🔎
  <br><이미지>
4. 스크랩 & 쪽지<br>
관심 있는 프로젝트 스크랩하고, 참여하고 싶은 프로젝트에는 쪽지로 참여 의사 전달하고!
<br> <이미지>
5. 평가<br>
개발이 끝나면, 마이페이지에서 함께 했던 동료들을 평가하고 평가받아요🐶<br>
좋은 팀원일수록 점수는 🆙  점수가 높을수록 인기도 🆙🆙
<br><이미지>

---
## Manual

### 🤖 Before Start
```shell
node --verison
npm --version
```
node 및 npm 설치 후 진행!
<br>
<br>

### ❗️Clone Repository
```bash
git clone https://github.com/leejw-lu/hap-peer.git ; cd hap-peer ;
```

### 📩 Install Pakages
```bash
npm install
```

### 📚 Add db.js
```js
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "your DB host",
  port: "your DB port",
  user: "your DB user",
  password: "your DB password",
  database: "happeer",
  dateStrings: "date",
});

db.connect();

module.exports = db;
```

### 🔥 Start!
```bash
node app.js
```

