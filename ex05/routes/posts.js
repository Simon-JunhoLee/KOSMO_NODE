var express = require('express');
var router = express.Router();
var db = require('../db');

/* 게시판 목록 페이지 */
router.get('/', function(req, res, next) {
  res.render('index', { title: '게시판', pageName : 'posts/list.ejs'});
});

// 게시판 목록 데이터 불러오기
router.get('/list.json', function(req, res){
    let page = req.query.page;
    let size = parseInt(req.query.size);
    let start = (page-1)*size;
    let query = "%" + req.query.query + "%";
    let sql = "SELECT pid, title, contents, writer, DATE_FORMAT(pdate, '%y.%m.%d. %r') AS formatted_pdate FROM posts "
    sql += "where title like ? or contents like ? or writer like ? order by pid desc limit ?, ?";
    db.get().query(sql, [query, query, query, start, size], function(err, rows){
        const documents = rows;
        if(err){
            console.log("게시판 목록 : ", err);
        }else {
            sql = "select count(*) total from posts where title like ? or contents like ? or writer like ?";
            db.get().query(sql, [query, query, query], function(err, rows){
                if(err){
                    console.log("총 데이터 수 : ", err);
                }else {
                        const total = rows[0].total;
                        res.send({documents, total});
                }
            });
        }
    });
});

// 글쓰기 페이지로 이동
router.get('/insert', function(req, res, next) {
    res.render('index', { title: '글쓰기', pageName : 'posts/insert.ejs'});
});

router.post('/insert', function(req, res){
    const title = req.body.title;
    const contents = req.body.contents;
    const uid = req.body.uid;
    console.log(title, contents, uid);
    const sql = "insert into posts(title, contents, writer) values(?, ?, ?)";
    db.get().query(sql, [title, contents, uid], function(err, rows){
        if(err){
            console.log("게시글 작성 오류 : ", err);
        }else {
            res.redirect('/posts');
        }
    })
});

// 게시글 Read 페이지 이동
router.get('/read', function(req, res, next) {
    const pid = req.query.pid;
    console.log(pid);
    const sql = "select pid, title, contents, writer, DATE_FORMAT(pdate, '%y.%m.%d. %r') AS formatted_pdate from posts where pid=?";
    db.get().query(sql,[pid], function(err, rows){
        if(err){
            console.log("게시글 상세페이지 오류 : ", err);
        }else {
            console.log(rows[0]);
            res.render('index', { title: '게시글 정보', pageName : 'posts/read.ejs', post : rows[0]});
        }
    });
});

// 게시글 수정 페이지 이동
router.get('/update', function(req, res, next){
    const pid = req.query.pid;
    console.log(pid);
    const sql = "select * from posts where pid=?";
    db.get().query(sql, [pid], function(err, rows){
        if(err){
            console.log("게시글 수정페이지 오류 : ", err);
        }else {
            console.log(rows[0]);
            const post = rows[0];
            res.render('index', {title: '게시글 수정', pageName: 'posts/update.ejs', post: post});
        }
    });
});

router.post('/update', function(req,res,next){
    const pid = req.body.pid;
    const title = req.body.title;
    const contents = req.body.contents;
    console.log(pid, title, contents);
    const sql = "update posts set title=?, contents=?, pdate = now() where pid=?";
    db.get().query(sql, [title, contents, pid], function(err, rows){
        if(err){
            console.log("게시글 수정 오류 : ", err);
        }else {
            res.redirect('/posts');
        }
    });
});

// 게시글 삭제 처리
router.get('/delete', function(req, res, next){
    const pid = req.query.pid;
    console.log(pid);
    const sql = "delete from posts where pid=?";
    db.get().query(sql, [pid], function(err, rows){
        if(err){
            console.log("게시글 삭제 오류 : ", err);
        }else {
            res.redirect("/posts");
        }
    })
});
module.exports = router;
