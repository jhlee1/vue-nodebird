const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn} = require('./middlewares');

const db = require('../models');

router.post('/', isNotLoggedIn, async (req, res, next) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 12); //salt 값이 높을수록 좋긴한데 컴퓨팅 파워를 많이 사용
        const exUser = await db.User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (exUser) { // 이미 회원가입되어있음
            return res.status(403).json({
                errorCode: 1,
                message: "이미 회원가입되어있습니다."
            });
            // return 꼭 해줘야한다. 안하면 아래에서 응답을 또 보내게 되서 2번 응답이 보내지기 때문에 can't set headers after they are sent 에러가 발생함.
        }

        const newUser = await db.User.create({
            where: {
                email: req.body.email,
                // password가 그대로 노출되기 때문에 암호화가 필요함: bcrypt, scrypt, pbkdf2 중 하나 사용하면 됨 일단 여기선 bcrypt를 쓸꺼임
                // bcrypt를 javascript로 구현하면 너무 느리기 때문에 다른 언어(Python)로 만들어짐 => 설치하다가 에러가 많이 날 수 있음. 공식문서 참조하길 권장
                // 윈도우의 경우, npm install --g -p windows-build-tools 명령어를 먼저 쓰고 설치하길 권장
                password: hash,
                nickname: req.body.nickname
            }
        });

        return res.status(201).json(newUser);
    } catch (err) {
        console.log(err);
        return next(err);
    }
});


// 로그인 구현을 위해 passport, session, cookie dependency 추가해주기 - npm i passport passport-local express-session cookie-parser
// 요청에 대한 로깅을 위해서 npm i morgan

router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) { // 에러 발생
            console.error(err);
            return next(err);
        }
        if (info) { // 실패
            return res.status(401).send(info.reason);
        }
        // cookie는 이 밑 라인에서 알아서 header에 넣어줌
        return req.login(user, async(err) => {  // session에 user를 저장 ... 어떻게? passport/index.js 안에 serialize 설정을 통해

            if (err) {
                console.err(err);
                return next(err);
            }
            return res.json(user);
        });
    })(req, res, next);
});

router.post('/logout', isLoggedIn, (req, res) => {
    if (req.isAuthenticated()) {
        req.logout(); // 필수
        req.session.destroy(); // 선택 (로그인 정보 외에 다른 정보가 session에 들어있을 수 있으므로)
        return res.status(200).send('로그아웃 되었습니다.');
    }
});


module.exports = router;
