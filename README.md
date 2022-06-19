# HAP-PEER 🥰

프로젝트 개발 동료를 찾기 위한 가장 행복한 ,
<br>
HAP-PEER!

### 1. 프로필 설정<br>
프로필 사진, 자기 소개, 기술스택까지 작성할 수 있는 프로필!<br>
내가 스크랩 한 글과 참여중인 프로젝트까지 한눈에 👀
<img src="https://user-images.githubusercontent.com/69899192/174474869-b35898c5-21eb-43f4-9a3b-0a43ad977ab0.png" width="700px">
### 2. 프로젝트 등록<br>
  하고 싶은 프로젝트가 있는데 누구랑 해야 하지? 어렵진 않지만 처음 해보는거라 같이 공부하면서 해보고싶다! 🤓<br>
  난이도와 원하는 기술스택까지 작성하여 나와 딱 맞는 동료 찾기🥰
  <img src="https://user-images.githubusercontent.com/69899192/174475494-ac7d5a24-1a04-4308-973d-a9e214d47176.png" width="700px">
### 3. 검색<br>
  원하는 난이도로 검색, 기술 스택으로 검색, 아이디로 검색, 제목으로 검색까지! 다양한 키워드로 원하는 프로젝트와 사용자를 검색하기🔎
  <img src="https://user-images.githubusercontent.com/69899192/174477224-02917d76-5086-45d2-aa70-cbe044962fc7.png" width="700px">
  <br>
  <img width="700" alt="스크린샷 2022-06-19 오후 7 47 47" src="https://user-images.githubusercontent.com/69899192/174477261-2579bc6d-d124-4cd1-be6c-1381216143ce.png">

### 4. 스크랩 & 쪽지<br>
관심 있는 프로젝트 스크랩하고, 참여하고 싶은 프로젝트에는 쪽지로 참여 의사 전달하고!
<br>
<img width="45%" alt="스크린샷 2022-06-19 오후 7 50 07" src="https://user-images.githubusercontent.com/69899192/174477346-8d93524a-463b-482c-b8c0-a44dc3be1bc1.png">
<img width="45%" alt="스크린샷 2022-06-19 오후 7 49 44" src="https://user-images.githubusercontent.com/69899192/174477336-fe6785ac-bfcb-4207-9a25-794fc379c399.png">


### 5. 평가<br>

개발이 끝나면, 마이페이지에서 함께 했던 동료들을 평가하고 평가받아요🐶<br>
좋은 팀원일수록 점수는 🆙  점수가 높을수록 인기도 🆙🆙
<br>
<img width="530" alt="스크린샷 2022-06-19 오후 7 52 39" src="https://user-images.githubusercontent.com/69899192/174477426-2c5c3587-1427-4a1a-a1e5-83d8f0d697e0.png">
<img width="800" alt="스크린샷 2022-06-19 오후 7 52 59" src="https://user-images.githubusercontent.com/69899192/174477441-e4c39067-0548-4f7b-8e9b-fe2e14f15146.png">
<img width="431" alt="스크린샷 2022-06-19 오후 7 54 07" src="https://user-images.githubusercontent.com/69899192/174477486-6eac15b1-4a2f-4c46-9658-4a504a793165.png">

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
git clone https://github.com/leejw-lu/hap-peer.git ; 
cd hap-peer ;
```

### 📩 Install Pakages
```bash
npm install
```

### 🛠️ Create DB
```bash
mysql –uroot –p

CREATE DATABASE happeer;
use happeer;
source happeerDB.sql
```
### 📚 Add db.js (app.js와 같은경로 위치에 파일추가)
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

