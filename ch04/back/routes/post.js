const express = require('express');
const multer = require('multer'); // form data로 업로드한 image를 읽기 위함
const path = require('multer');

const { isLoggedIn } = require('./middlewares');
const db = require('../models');

const router = express.Router();

const upload = multer({
    storage: multer.diskStorage({ // 이미지를 어떻게 저장할 것인가 일단은 임시로 backend 서버에 file로 저장 ... uploads폴더 만들어주기
        destination(req, res, done) {
            done(null, 'uploads');
        },
        filename(req, file, done) {
            // 중복된 이름으로 파일 업로드시 덮어씌워지기 때문에 현재시각 (millisecond 까지) 붙여주기
            const ext = path.extname(file.originalname);
            const basename = path.basename(file.originalname, ext);
            done(null, basename + Date.now() + ext);
        }
    }),
    limit: { fileSize: 20 * 1024 * 1024 } // 업로드 사이즈를 20MB로 제한
})

router.post('/images', isLoggedIn, upload.array(req), (req, res) => { // single - 파일 하나, array 같은 키로 여러개
    console.log(req.files); // req.files = [ {filename: 'example120200205.png'}, { filename: 'example220200205.png' } ]   업로드한 파일에 대한 정보를 가지고 있음
    res.json(req.files.map(v => v.filename));

})



router.post('/', isLoggedIn, (req, res, next) => {
    // if (req.isAuthenticated()) {} // 앞에 미들웨어에서 처리하므로 필요 없음
    try {
        // 정규 표현식으로 # 태그 추출하기 
        // EX) req.body.content === '안녕하세요 여러분~! #NodeJS #Vue
        // req.body.imagePaths,
        const hashtags = req.body.match(/#[^\s#]+/g);
        const newPost = await db.Post.create({
            content: req.body.content,
            UserId: req.user.id
        });
        if (hashtags) {
            const result = await Promise.all(
                hashtags.map(tag => db.Hashtag.findOrCreate({
                where: { name: tag.slice(1).toLowerCase()},
            })));
        }
        await newPost.addHashtags(result.map(r => r[0])); // models에서 Post.belongsToMany로 연관 관계를 설정해놔서 addHashtags라는 method가 sequelize에서 자동으로 생성됨
        
        // db.sequelize.query('SQL); 쿼리가 복잡한 경우 이런식으로 직접 쿼리를 보내서 처리 가능
    
        const fullPost = await db.Post.findOne({
            where: { id: newPost.id},
            include: [{
                model: db.User,
                attributes: [
                    'id',
                    'nickname'
                ]
            }]
        });

        return res.json(fullPost);

    } catch(err) {
        console.error(err);
        next(err);
    }


});

router.post('/images', isLoggedIn, (req, res) => {

});

module.exports = router;

