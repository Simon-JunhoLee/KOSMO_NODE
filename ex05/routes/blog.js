var express = require('express');
var router = express.Router();

/* 블로그 검색 */
router.get('/', function(req, res, next) {
  res.render('index', { title: '블로그 검색', pageName : 'blog/search.ejs'});
});

module.exports = router;
