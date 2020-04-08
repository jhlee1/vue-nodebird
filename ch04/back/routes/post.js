const express = require('express');
const multer = require('multer'); // form data로 업로드한 image를 읽기 위함
const path = require('multer');

const { isLoggedIn } = require('./middlewares');

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



router.post('/', isLoggedIn, (req, res) => {
    // if (req.isAuthenticated()) {} // 앞에 미들웨어에서 처리하므로 필요 없음



});

router.post('/images', isLoggedIn, (req, res) => {

});

module.exports = router;

// exports의 역할 - 외부에서 사용할 수 있도록 만들어줌
// exports된 module은 require를 이용해서 사용할 수 있음
// 위의 exports.XXXX는 아래와 같이 표현할 수 있음
// module.exports가 exports.XXX보다 우선권이 있음

// module.exports = {
//  isLoggedIn: (req, res, next) =>  {},
//  isNotLoggedIn: (req, res, next) => {} 
// }