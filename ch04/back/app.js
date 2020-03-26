const express = require('express');
const db = require('./models');
const cors = require('cors');
const app = express();

db.sequelize.sync({ force: true });
app.use(cors('http://localhost:3000'));
app.use(express.json()); // 이게 있어야만 request body를 json으로 받을 수 있음
app.use(express.urlencoded({extended: false})); // Form에서 Action을 통해서 전송할 때 그 데이터를 해석해서 req.body에 넣어줌

app.get('/', (req, res) => {
    res.status(200).send('안녕 제로초');
});

app.post('/user', async (req, res) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 12); //salt 값이 높을수록 좋긴한데 컴퓨팅 파워를 많이 사용
        const exUser = await db.User.findOne({
            email: req.body.email
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


app.post('/axios/test', async (req, res) => {
    try {
        console.log(req);
        res.status(200);
    } catch (err) {
        console.log(err);
        next(err);
    }
});


app.listen(3085, () => {
    console.log(`백엔드 서버 ${3085}번 포트에서 작동중.`);
});
