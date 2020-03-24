const express = require('express');
const db = require('./models');
const app = express();

db.sequelize.sync();

app.use(express.json()); // 이게 있어야만 request body를 json으로 받을 수 있음
app.use(express.urlencoded({extended: false})); // Form에서 Action을 통해서 전송할 때 그 데이터를 해석해서 req.body에 넣어줌

app.get('/', (req, res) => {
    res.status(200).send('안녕 제로초');
});

app.post('/user', async (req, res) => {
    try {
        const newUser = await db.User.create({
            where: {
                email: req.body.email,
                password: req.body.password,
                nickname: req.body.nickname
            }
        });

        res.status(201).json(newUser);
    } catch (err) {
        console.log(err);
        next(err);
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
