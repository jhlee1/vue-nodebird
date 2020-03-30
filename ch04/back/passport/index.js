const passport = require('passport');

module.exports = () => {
    passport.serializeUser((user, done) => {
        return done(null, user.id); // 서버 메모리 사용을 줄이기 위해 user의 모든 정보를 저장하지 않고 id만 저장
    });

    passport.deserializeUser(() => {

    });
};