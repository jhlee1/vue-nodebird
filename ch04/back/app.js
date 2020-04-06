const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const cookie = require('cookie-parser');
const morgan = require('morgan');

const passportConfig = require('./passport');
const db = require('./models');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const app = express();

db.sequelize.sync({ force: true }); // 실무에선 쓰지말고 migration 권장
passportConfig();

app.use(morgan('dev'));
app.use(cors({
    origin: 'http://localhost:3000', credentials: true
}));
app.use('/', express.static('uploads')); // uploads 폴더와 같이 정적 파일들을 제공하기 위해서 추가해줘야함 app.use('프론트 주소', express.static('백앤드 주소'));
app.use(express.json()); // 이게 있어야만 request body를 json으로 받을 수 있음
app.use(express.urlencoded({extended: false})); // Form에서 Action을 통해서 전송할 때 그 데이터를 해석해서 req.body에 넣어줌
app.use(cookie('cookiesecret'));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'cookiesecret',
    cookie: { // 브라우저에 connect.sid 쿠키로 저장됨
        httpOnly: true,
        secure: false
    }
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.status(200).send('안녕 제로초');
});

app.use('/user', userRouter);
app.use('/post', postRouter);

app.listen(3085, () => {
    console.log(`백엔드 서버 ${3085}번 포트에서 작동중.`);
});


// require과 module.exports, exports.XXX
// 대표적인 것 = module.exports로 선언하고, 사소한 것은 exports.XXX로 선언하는 것이 좋음(각 함수별로 분해하기 쉽게)
// 우선권은 module.exports가 더 높음
