const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const cookie = require('cookie-parser');
const morgan = require('morgan');

const passportConfig = require('./passport');
const db = require('./models');
const userRouter = require('./routes/user');
const app = express();

db.sequelize.sync({ force: true }); // 실무에선 쓰지말고 migration 권장
passportConfig();

app.use(morgan('dev'));
app.use(cors({
    origin: 'http://localhost:3000', credential: true
}));
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

app.post('/post', (req, res) => {
    if (req.isAuthenticated()) {

    }
});

app.listen(3085, () => {
    console.log(`백엔드 서버 ${3085}번 포트에서 작동중.`);
});
