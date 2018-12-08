var express = require('express');
var router = express.Router();
var query = require('../mysql/query')
    /* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.post('/list', function(req, res, next) {
    var obj = {}
    var size = req.body.size * 1,
        start = (req.body.page - 1) * size
    query('select count(*) from commodity', function(err, resoults) {
        obj.rouch = resoults[0]['count(*)']
    })
    query('select * from commodity limit ?,?', [start, size], function(err, resoults) {
        obj.data = resoults
        res.json(obj)
    })
});
module.exports = router;