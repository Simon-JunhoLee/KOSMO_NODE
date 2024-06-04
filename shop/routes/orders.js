var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 주문자 정보 입력
router.post('/purchase', function(req,res){
    const pid = req.body.pid;
    const uid = req.body.uid;
    const uname = req.body.uname;
    const phone = req.body.phone;
    const address1 = req.body.address1;
    const address2 = req.body.address2;
    const sum = req.body.sum;
    let sql = "insert into purchase(pid, uid, uname, phone, address1, address2, sum)";
    sql += " values(?, ?, ?, ?, ?, ?, ?)";
    db.get().query(sql, [pid, uid, uname, phone, address1, address2, sum], function(err, rows){
        if(err){
            console.log('주문자 정보 입력 에러 : ', err);
            res.send({result:0});
        }else{
            res.send({result:1});
        }
    });
})

// 주문 상품 입력
router.post('/insert', function(req, res){
    const pid = req.body.pid;
    const bid = req.body.bid;
    const price = req.body.price;
    const qnt = req.body.qnt;
    const sql = "insert into orders(pid, bid, price, qnt) values(?, ?, ?, ?)";
    db.get().query(sql, [pid, bid, price, qnt], function(err, rows){
        if(err){
            console.log('주문 상품 입력 에러 : ', err);
            res.send({result:0});
        }else{
            res.send({result:1});
        }
    });
});

// 사용자별 주문목록
router.get('/list', function(req, res){
    const uid = req.query.uid;
    let sql = "select *, date_format(pdate, '%Y-%m-%d %T')as fmtDate,";
    sql += " format(sum, 0) fmtSum" 
    sql += " from purchase where uid=?";
    sql += " order by pdate desc";
    db.get().query(sql, [uid], function(err, rows){
        if(err){
            console.log('사용자별 주문목록 에러 : ', err);
        }else{
            res.send(rows);
        }
    });
});

// 특정주문의 주문상품목록
router.get('/books', function(req, res){
    const pid = req.query.pid;
    let sql = "select o.*, b.title, b.image, format(o.price, 0) fmtPrice, format(o.price*o.qnt, 0) fmtSum";
    sql += " from orders o, books b";
    sql += " where o.bid=b.bid and pid=?";
    db.get().query(sql, [pid], function(err, rows){
        if(err){
            console.log('특정주문의 주문상품목록 에러 : ', err);
        }else{
            res.send(rows);
        }
    });
});

// 관리자 주문목록
router.get('/admin/list', function(req, res){
    const key = req.query.key;
    const word = req.query.word;
    const page = parseInt(req.query.page);
    const size = parseInt(req.query.size);
    let sql = "select *, date_format(pdate, '%Y-%m-%d %T')as fmtDate, format(sum, 0) fmtSum";
    sql += " from purchase";
    sql += ` where ${key} like '%${word}%'`;
    sql += " order by pdate desc";
    sql += " limit ?, ?";
    db.get().query(sql, [(page-1)*size, size], function(err, rows){
            const documents = rows;
            sql = "select count(*) count from purchase";
            sql += ` where ${key} like '%${word}%'`;
            db.get().query(sql, function(err, rows){
                const count = rows[0].count;
                if(count == 0){
                    res.send({documents:[], count})
                }else{
                    res.send({documents, count})
                }
            });
    });
});

// 주문상태변경
router.post('/status', function(req, res){
    const pid = req.body.pid;
    const status = req.body.status;
    let sql = "update purchase set status=? where pid=?";
    db.get().query(sql, [status, pid], function(err, rows){
        if(err){
            console.log('주문상태변경 에러 : ', err);
            res.send({result:0});
        }else{
            res.send({result:1});
        }
    });
});

module.exports = router;
