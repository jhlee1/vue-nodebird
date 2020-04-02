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

