exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
         return next(); // next() 인 경우 다음 middleware로 넘겨라, but next(abc) - 이런식으로 parameter가 있는 경우 에러 처리로 넘어감
    }

    return res.status(401).send('로그인이 필요합니다.');
};

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
         return next();
    }

    return res.status(401).send('로그인한 사용자는 할 수 없습니다.');
};

module.exports = router;

// exports의 역할 - 외부에서 사용할 수 있도록 만들어줌
// exports된 module은 require를 이용해서 사용할 수 있음
// 위의 exports.XXXX는 아래와 같이 표현할 수 있음
// module.exports가 exports.XXX보다 우선권이 있음

// module.exports = {
//  isLoggedIn: (req, res, next) =>  {},
//  isNotLoggedIn: (req, res, next) => {}
// }