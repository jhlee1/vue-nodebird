const express = require('express');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

router.post('/', isLoggedIn, (req, res) => {
    // if (req.isAuthenticated()) {} // 앞에 미들웨어에서 처리하므로 필요 없음



});

router.post('/images', isLoggedIn, (req, res) => {

});

module.exports = router;