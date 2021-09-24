var express = require('express');
var router = express.Router();
var Mock = require('mockjs');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' });
});

module.exports = router;


// 'Accept': '*/*',
// 'Accept-Encoding': 'utf-8',
// 'Accept-Language': 'zh-CN,zh;q=0.8',
// 'Connection': 'keep-alive',
// 'Cookie': 'BAIDUID=A78C39414751FF9349AAFB0FDA505058:FG=1; true; __bsi=12248088537049104479_00_7_N_R_33_0303_cca8_Y',
// 'Host': 'ai.jd.com',
// 'Referer': 'http://miaosha.jd.com'