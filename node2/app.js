require('dotenv').config();
const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.SERVER_PORT || 3000;

//db연결 코드
var db_connect = require('./db/db_connect');
var db_sql = require('./db/db_sql');


//로그인 처리를 위한 라이브러리
const session = require('express-session');
// session 저장소 지정(메모리)
const MemoryStore = require("memorystore")(session);
// Passport lib 
const passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy;
// My util
var goto = require('./util/goto');

// CORS 지정
const cors = require("cors");
nunjucks.configure('views', {
    express: app,
});

app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
//-------------------------라이브러리 선언----------------------------------




//--------------------------파일 업로드----------------------------------------




//-------------------------로그인 처리--------------------------------------

// Session 선언
app.use(
    session({
        secret: "secret key",
        resave: false,
        saveUninitialized: true,

        store: new MemoryStore({
            checkPeriod: 86400000, // 24 hours (= 24 * 60 * 60 * 1000 ms)
        })
    })
);

// 2. Passport를 이용한 로그인 처리 ---------------------------------------------------------------------------------------

// passport 초기화 및 session 연결
app.use(passport.initialize());
app.use(passport.session());

// login이 최초로 성공했을 때만 호출되는 함수
// done(null, user.id)로 세션을 초기화 한다.
passport.serializeUser(function (req, user, done) {
    console.log('serializeUser' + user);
    console.log('serializeUser' + user.id);
    console.log('serializeUser' + user.name);
    console.log('serializeUser' + user.acc);

    done(null, user);
});

// 사용자가 페이지를 방문할 때마다 호출되는 함수
// done(null, id)로 사용자의 정보를 각 request의 user 변수에 넣어준다.
passport.deserializeUser(function (req, user, done) {
    console.log('Login User' + user.name + ' ' + user.id);
    done(null, user);
});

// local login 전략을 세우는 함수
// client에서 전송되는 변수의 이름이 각각 id, pw이므로 
// usernameField, passwordField에서 해당 변수의 값을 받음
// 이후부터는 username, password에 각각 전송받은 값이 전달됨
// 위에서 만든 login 함수로 id, pw가 유효한지 검출
// 여기서 로그인에 성공하면 위의 passport.serializeUser 함수로 이동

passport.use(
    new LocalStrategy(
        {
            usernameField: "id",
            passwordField: "pwd",
        },
        function (userid, password, done) {
            console.log('--------------------------' + userid);
            console.log('--------------------------' + password);

            conn = db_connect.getConnection();
            conn.query(db_sql.cust_select_one, [userid], (err, row, fields) => {

                if (err) throw err;

                let result = 0;

                if (row[0] == undefined) {
                    return done(null, false, { message: "Login Fail " });
                } else if (row[0]['pwd'] != password) {
                    return done(null, false, { message: "Login Fail " });
                } else {

                    let name = row[0]['name'];
                    let acc = row[0]['acc'];
                    return done(null, { id: userid, name: name, acc: acc });
                }

            });

        }
    )
);

// login 요청이 들어왔을 때 성공시 / 로, 실패시 /login 으로 리다이렉트
app.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/loginerror",
    })
);
app.get('/loginerror', (req, res) => {
    res.render('index', {
        centerpage: 'loginerror'
    })
})

// http://127.0.0.1/
app.get('/', (req, res) => {
    goto.go(req,res,undefined);//무저건 index호출 
    // res.render('index');
});
//로그인
app.get('/login', (req, res) => {
    goto.go(req,res,{ 'centerpage': 'login' });
    // res.render('index', { 'centerpage': 'login' });
});
//로그아웃
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})

app.get('/register', (req, res) => {
    goto.go(req,res,{ 'centerpage': 'register' });
    // res.render('index', { 'centerpage': 'register' });
});

app.get('/about', (req, res) => {
    goto.go(req,res,{ 'centerpage': 'about' });
    // res.render('index', { 'centerpage': 'about' });
});

// POST 요청으로 변경 (loginimpl)

// POST 요청으로 변경 (registerimpl)
app.post('/registerimpl', (req, res) => {
    let id = req.body.id;
    let pwd = req.body.pwd;
    let name = req.body.name;
    let acc = req.body.acc;
    conn = db_connect.getConnection();
    console.log(id + ' ' + pwd + ' ' + name + ' ' + acc + ' ');

    let values = [id, pwd, name, acc];

    conn.query(db_sql.cust_insert, values, (e, result, fields) => {
        try {
            if (e) {
                console.log('Insert Error');
                throw e;
            } else {
                console.log('Insert OK !');
                goto.go(req,res,{ 'centerpage': 'registerok' });
                // res.render('index', { 'centerpage': 'registerok' });
            }
        } catch (e) {
            goto.go(req,res,{ 'centerpage': 'registerfail' });
            // res.render('index', { 'centerpage': 'registerfail' });
            console.log(e);
        } finally {
            db_connect.close(conn);
        }
    });
});


//app.js-> 라우터폴더의 html을 보여줌 
const html = require('./routes/html');
app.use('/html', html);

const geo = require('./routes/geo');
app.use('/geo', geo);

const chart = require('./routes/chart');
app.use('/chart', chart);

const cust = require('./routes/cust');
app.use('/cust', cust);

const item = require('./routes/item');
app.use('/item', item);

const useritem = require('./routes/useritem');
app.use('/useritem', useritem);

const admin = require('./routes/admin');
app.use('/admin', admin);

const block = require('./routes/block');
app.use('/block', block);







//서버시작
app.listen(port, () => {
    console.log(`server start port:${port}`);
});
