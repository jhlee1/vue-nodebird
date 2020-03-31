const passport = require('passport');
const local = require('./local');
const db = require('../models');

module.exports = () => {
    passport.serializeUser((user, done) => {
        return done(null, user.id); // 서버 메모리 사용을 줄이기 위해 user의 모든 정보를 저장하지 않고 id만 저장
    });

    passport.deserializeUser( async (id, done) => { // 모든 요청 마다 전처리로 실행됨
        try {
            const user = await db.User.findOne({ where: { id }});

            return done(null, user); // req.user, req.isAuthenticated() == true
        } catch (err) {
            console.error(err);
            return done(err);
        }

    });
    local();
};
