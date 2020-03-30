const passport = require('passport');
const bcrypt = require('bcrypt');
const db = require('../models');
const { Strategy: LocalStrategy } = require('passport-local');

module.exports = () => {
passport.use(new localStorage({ // email과 password 검사
    usernameField: 'email', // req.body.email
    passwordField: 'password' // req.body.password

}, async (email, password, done) => {
    try {
        const exUser = await db.User.findOne({ where: { email }});
        
        if (!exUser) {
            return done(null, false, { reason: '존재하지 않은 유저입니다.'}); // done(에러, 성공, 실패)로 넣어주면됨. 이 경우엔 실패한 경우를 return
        }
        const result = await bcrypt.compare(password, exUser.password);

        if (result) {
            done(null, exUser);
        } else {
            return done(null, false, { reason : '비밀번호가 틀립니다'});
        }
    } catch (err) {
        console.error(err);
        done(err);
    }

}))
};