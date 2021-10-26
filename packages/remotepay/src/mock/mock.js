import Mock from 'mockjs';

const billDetail = {
  code: 10000,
  message: '请求成功！',
  data: {
    billId: '1111',
    billTypeName: 'Checkout',
    billTypeDesc: '退房账单',
    billStatusName: 'New',
    billStatusDesc: '待支付',
    signUserName: '王某',
    staffId: '1111',
    staffName: '张三',
    roomId: '1111',
    roomNo: '1-100',
    projectId: '98',
    projectName: '北京冠寓酒仙桥店',
    contractNo: 'NBBMMM000MMMMMMMMMMMMMM',
    expectPayDate: '2019年12月30日',
    IsCheckout: true,
    amountInfo: {
      totalAmount: 300,
      finalAmount: 200,
      carryAmount: 300,
      couponAmout: 900,
    },
    billDetailItem: [
      {
        fundTypeName: 'WaterFee',
        fundTypeDesc: '水费',
        amount: 20000,
      },
      {
        fundTypeName: 'FeeRefund',
        fundTypeDesc: '服务费退费',
        amount: 20000,
      },
    ],
  },
};

const orderDetail = {
  code: 10000,
  message: '请求成功！',
  data: {
    orderId: '1111',
    orderDesc: '电费账单',
    projectId: '98',
    amount: 1000,
  },
};

const doPay = { code: 10000, message: '请求成功！', data: { payParam: "\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n<!DOCTYPE html>\r\n<html>\r\n<head>\r\n    <meta charset=\"GBK\">\r\n    <meta name=\"viewport\" content=\"width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no\" />\r\n    <title>收银台</title>\r\n    <link rel=\"stylesheet\" type=\"text/css\" href=\"https://dev.chinaebi.cn:50081/mrpos/h5Cashier/css/index.css\" />\r\n    <link rel=\"stylesheet\" type=\"text/css\" href=\"https://dev.chinaebi.cn:50081/mrpos/h5Cashier/css/guanyu/vip.css\" />\r\n    <style>\r\n    .none{display:none;}\r\n    </style>\r\n</head>\r\n<body class=\"vip-guanyu\">\r\n\r\n<form method=\"post\" accept-charset=\"GBK\" action=\"https://dev.chinaebi.cn:50081/mrpos/H5Cashier.do\">\r\n    <section class=\"wrapper\">\r\n        <div class=\"kong\"></div>\r\n        <div class=\"merc\">\r\n             \r\n                回归测试1w\r\n                 \r\n            \r\n        </div>\r\n        <div class=\"price\">\r\n            ￥0.01\r\n        </div>\r\n        <div class=\"order\">\r\n            订单号: 201912100034793676\r\n        </div>\r\n        <div class=\"kong\"></div>\r\n    </section>\r\n    <section class=\"wrapper\">\r\n        <div class=\"pay-title pay-item\">\r\n            <h2>选择支付方式</h2>\r\n        </div>\r\n        <div id=\"wcPn\" class=\"pay-item none\">\r\n            <img src=\"https://dev.chinaebi.cn:50081/mrpos/h5Cashier/images/wx.png\" class=\"pic\">\r\n            <span class=\"pay\">微信支付</span><img src=\"https://dev.chinaebi.cn:50081/mrpos/h5Cashier/images/guanyu/check.png\" id=\"0\" align=\"right\" class=\"pic2\">\r\n        </div>\r\n        <hr class=\"line-1px pic\" />\r\n        \r\n            \r\n            <div id=\"aliPay\" class=\"pay-item none\">\r\n                <img src=\"https://dev.chinaebi.cn:50081/mrpos/h5Cashier/images/alipay.png\" class=\"pic\">\r\n                <span class=\"pay\">支付宝支付</span><img src=\"https://dev.chinaebi.cn:50081/mrpos/h5Cashier/images/guanyu/Oval.png\" id=\"2\" align=\"right\" class=\"pic2\">\r\n            </div>\r\n            <hr class=\"line-1px pic\" />\r\n\r\n        \r\n        \r\n    </section>\r\n    <input type=\"hidden\" id=\"transType\" name=\"trans_type\" />\r\n    <input type=\"hidden\" id=\"tradeNo\" name=\"trade_no\" value=\"201912100034793676\" />\r\n    <input type=\"hidden\" id=\"payAmount\" name=\"pay_amount\" value=\"1\" />\r\n    <input type=\"hidden\" id=\"merchantName\" name=\"merchant_name\" value=\"回归测试1w\" />\r\n    <input type=\"hidden\" id=\"orderId\" name=\"order_id\" value=\"1577945356202\" />\r\n    <input type=\"hidden\" id=\"openId\" name=\"open_id\" value=\"oLJyz0t9SbwB4UrG0JGSqb-MXcc0\" />\r\n    <input type=\"hidden\" id=\"transTyp\" name=\"trans_typ\" value=\"\" />\r\n    <div class=\"gy-vip-logo\">\r\n        <div class=\"gy-logo\">\r\n            <img src=\"https://dev.chinaebi.cn:50081/mrpos/h5Cashier/images/guanyu/gy-logo.png\" alt=\"龙湖-冠寓\">\r\n        </div>\r\n        <div class=\"gy-txt-info\">\r\n            <p>由龙湖旗下电银提供技术支持</p>\r\n        </div>\r\n    </div>\r\n    <div class=\"btn-div\">\r\n        <input class=\"btn\" type=\"submit\" id=\"submit\" disabled=\"disabled\" value=\"确认支付0.01\">\r\n    </div>\r\n</form>\r\n<script src=\"https://dev.chinaebi.cn:50081/mrpos/js/jquery.js\"></script>\r\n<script src=\"https://dev.chinaebi.cn:50081/mrpos/h5Cashier/js/h5cashier.js\"></script>\r\n<script type=\"text/javascript\">\r\n    var ovalImg = \"https://dev.chinaebi.cn:50081/mrpos/h5Cashier/images/guanyu/Oval.png\";\r\n    var checkImg = \"https://dev.chinaebi.cn:50081/mrpos/h5Cashier/images/guanyu/check.png\";\r\n    var isC2MercId = \"0\";\r\n    $(document).ready(function () {\r\n        var typeMap = { \"t0\": \"wx\", \"t1\": \"unPay\", \"t2\": \"aliPay\" };\r\n        var ua = navigator.userAgent.toLowerCase();\r\n        var isWx = false;\r\n        if (!isWx) {\r\n            if (ua.match(/MicroMessenger/i) == \"micromessenger\") {\r\n                isWx = true;\r\n            }\r\n        }\r\n        var transTyp = $(\"#transTyp\").val();\r\n        if (isWx || transTyp == 'APP') {\r\n            $(\"#wcPn\").show();\r\n            $(\"#wcPn + hr\").show();\r\n            $(\".pic2[id=0]\").attr(\"src\", checkImg);\r\n            $(\"#transType\").val(typeMap[\"t0\"]);\r\n        } else {\r\n            $(\"#aliPay\").show();\r\n            $(\"#aliPay + hr\").show();\r\n            if (isC2MercId == '1') {\r\n                $(\".pic2[id=1]\").attr(\"src\", checkImg);\r\n                $(\"#transType\").val(typeMap[\"t1\"]);\r\n            } else {\r\n                $(\".pic2[id=2]\").attr(\"src\", checkImg);\r\n                $(\"#transType\").val(typeMap[\"t2\"]);\r\n            }\r\n        }\r\n        $(\".btn[type=submit]\").removeAttr(\"disabled\");\r\n        $(\".pic2\").click(function () {\r\n            var id = $(this).attr(\"id\");\r\n            $(this).attr(\"src\", checkImg);\r\n            $(\".pic2[id!=\" + id + \"]\").attr(\"src\", ovalImg);\r\n            $(\"#transType\").val(typeMap[\"t\" + id]);\r\n        });\r\n\r\n        $('#submit').click(function () {\r\n            var wcPn = $('#wcPn .pic2');\r\n\r\n            if (wcPn.is(':visible') && wcPn.attr('src').indexOf('check') != -1 && !isWx) {\r\n\r\n                var toBasePath = 'trade_no=201912100034793676&pay_amount=1&merchant_name=回归测试1w&order_id=1577945356202';\r\n                var path = 'pages/index/index?from=dy&trans_type=wx&' + toBasePath + '&trans_typ=APP';\r\n                var notify = 'https://dev.chinaebi.cn:50081/mrpos/H5CashierNotify.do?ord_no=201912100034793676';\r\n\r\n                H5Cashier.wxPay({\r\n                    path: path,\r\n                    notify: notify\r\n                });\r\n\r\n                setTimeout(function () {\r\n                    window.location.href = 'https://dev.chinaebi.cn:50081/mrpos/h5Cashier/wxPayFn.jsp?' + toBasePath\r\n                }, 200);\r\n\r\n                return false;\r\n            }\r\n        });\r\n    });\r\n</script>\r\n</body>\r\n</html>\r\n" } };


const roomList = {
  status: 'ok',
  msg: 'ok',
  data: [
    {
      id: '1',
      name: '1',
      child: [
        {
          id: '1',
          name: '1',
          child: [
            {
              id: '190269',
              name: '111111',
              child: [],
            },
            {
              id: '190271',
              name: '1012',
              child: [],
            },
            {
              id: '190305',
              name: '10004',
              child: [],
            },
          ],
        },
        {
          id: '2',
          name: '2',
          child: [
            {
              id: '190304',
              name: '12345',
              child: [],
            },
          ],
        },
      ],
    },
    {
      id: '2',
      name: '2',
      child: [
        {
          id: '2',
          name: '2',
          child: [
            {
              id: '190303',
              name: '10003',
              child: [],
            },
          ],
        },
      ],
    },
    {
      id: '3',
      name: '3',
      child: [
        {
          id: '3',
          name: '3',
          child: [
            {
              id: '190302',
              name: '10002',
              child: [],
            },
          ],
        },
      ],
    },
    {
      id: '8',
      name: '8',
      child: [
        {
          id: '10',
          name: '10',
          child: [
            {
              id: '20038',
              name: '1019',
              child: [],
            },
            {
              id: '20047',
              name: '1007',
              child: [],
            },
            {
              id: '20051',
              name: '1005',
              child: [],
            },
            {
              id: '20090',
              name: '1010',
              child: [],
            },
            {
              id: '20105',
              name: '1006',
              child: [],
            },
            {
              id: '20163',
              name: '1002',
              child: [],
            },
            {
              id: '20178',
              name: '1016',
              child: [],
            },
            {
              id: '20193',
              name: '1014',
              child: [],
            },
            {
              id: '20194',
              name: '1003',
              child: [],
            },
            {
              id: '20197',
              name: '1013',
              child: [],
            },
            {
              id: '20214',
              name: '1020',
              child: [],
            },
            {
              id: '20249',
              name: '1004',
              child: [],
            },
            {
              id: '20253',
              name: '1012',
              child: [],
            },
            {
              id: '20269',
              name: '1017',
              child: [],
            },
            {
              id: '20277',
              name: '1015',
              child: [],
            },
            {
              id: '20281',
              name: '1009',
              child: [],
            },
            {
              id: '20299',
              name: '1018',
              child: [],
            },
            {
              id: '20311',
              name: '1008',
              child: [],
            },
            {
              id: '20329',
              name: '1011',
              child: [],
            },
            {
              id: '20349',
              name: '1001',
              child: [],
            },
          ],
        },
        {
          id: '11',
          name: '11',
          child: [
            {
              id: '20037',
              name: '1103',
              child: [],
            },
            {
              id: '20056',
              name: '1107',
              child: [],
            },
            {
              id: '20065',
              name: '1113',
              child: [],
            },
            {
              id: '20067',
              name: '1110',
              child: [],
            },
            {
              id: '20071',
              name: '1119',
              child: [],
            },
            {
              id: '20095',
              name: '1109',
              child: [],
            },
            {
              id: '20120',
              name: '1120',
              child: [],
            },
            {
              id: '20141',
              name: '1104',
              child: [],
            },
            {
              id: '20149',
              name: '1114',
              child: [],
            },
            {
              id: '20188',
              name: '1116',
              child: [],
            },
            {
              id: '20199',
              name: '1117',
              child: [],
            },
            {
              id: '20201',
              name: '1105',
              child: [],
            },
            {
              id: '20202',
              name: '1106',
              child: [],
            },
            {
              id: '20241',
              name: '1102',
              child: [],
            },
            {
              id: '20242',
              name: '1112',
              child: [],
            },
            {
              id: '20262',
              name: '1115',
              child: [],
            },
            {
              id: '20288',
              name: '1108',
              child: [],
            },
            {
              id: '20319',
              name: '1118',
              child: [],
            },
            {
              id: '20330',
              name: '1111',
              child: [],
            },
            {
              id: '20335',
              name: '1101',
              child: [],
            },
          ],
        },
        {
          id: '12',
          name: '12',
          child: [
            {
              id: '20040',
              name: '1210',
              child: [],
            },
            {
              id: '20043',
              name: '1203',
              child: [],
            },
            {
              id: '20073',
              name: '1205',
              child: [],
            },
            {
              id: '20083',
              name: '1212',
              child: [],
            },
            {
              id: '20087',
              name: '1204',
              child: [],
            },
            {
              id: '20089',
              name: '1219',
              child: [],
            },
            {
              id: '20096',
              name: '1202',
              child: [],
            },
            {
              id: '20123',
              name: '1213',
              child: [],
            },
            {
              id: '20126',
              name: '1209',
              child: [],
            },
            {
              id: '20136',
              name: '1206',
              child: [],
            },
            {
              id: '20153',
              name: '1215',
              child: [],
            },
            {
              id: '20213',
              name: '1216',
              child: [],
            },
            {
              id: '20226',
              name: '1220',
              child: [],
            },
            {
              id: '20260',
              name: '1214',
              child: [],
            },
            {
              id: '20271',
              name: '1217',
              child: [],
            },
            {
              id: '20280',
              name: '1207',
              child: [],
            },
            {
              id: '20308',
              name: '1218',
              child: [],
            },
            {
              id: '20309',
              name: '1208',
              child: [],
            },
            {
              id: '20326',
              name: '1211',
              child: [],
            },
            {
              id: '20338',
              name: '1201',
              child: [],
            },
          ],
        },
        {
          id: '13',
          name: '13',
          child: [
            {
              id: '20029',
              name: '1307',
              child: [],
            },
            {
              id: '20041',
              name: '1310',
              child: [],
            },
            {
              id: '20048',
              name: '1305',
              child: [],
            },
            {
              id: '20060',
              name: '1315',
              child: [],
            },
            {
              id: '20062',
              name: '1306',
              child: [],
            },
            {
              id: '20068',
              name: '1317',
              child: [],
            },
            {
              id: '20102',
              name: '1302',
              child: [],
            },
            {
              id: '20104',
              name: '1320',
              child: [],
            },
            {
              id: '20109',
              name: '1314',
              child: [],
            },
            {
              id: '20138',
              name: '1319',
              child: [],
            },
            {
              id: '20146',
              name: '1303',
              child: [],
            },
            {
              id: '20211',
              name: '1312',
              child: [],
            },
            {
              id: '20230',
              name: '1309',
              child: [],
            },
            {
              id: '20244',
              name: '1316',
              child: [],
            },
            {
              id: '20255',
              name: '1304',
              child: [],
            },
            {
              id: '20278',
              name: '1313',
              child: [],
            },
            {
              id: '20284',
              name: '1311',
              child: [],
            },
            {
              id: '20294',
              name: '1308',
              child: [],
            },
            {
              id: '20303',
              name: '1318',
              child: [],
            },
            {
              id: '20339',
              name: '1301',
              child: [],
            },
          ],
        },
        {
          id: '14',
          name: '14',
          child: [
            {
              id: '20016',
              name: '1409',
              child: [],
            },
            {
              id: '20022',
              name: '1420',
              child: [],
            },
            {
              id: '20064',
              name: '1415',
              child: [],
            },
            {
              id: '20077',
              name: '1402',
              child: [],
            },
            {
              id: '20078',
              name: '1413',
              child: [],
            },
            {
              id: '20092',
              name: '1403',
              child: [],
            },
            {
              id: '20110',
              name: '1412',
              child: [],
            },
            {
              id: '20122',
              name: '1410',
              child: [],
            },
            {
              id: '20154',
              name: '1416',
              child: [],
            },
            {
              id: '20190',
              name: '1405',
              child: [],
            },
            {
              id: '20200',
              name: '1406',
              child: [],
            },
            {
              id: '20225',
              name: '1419',
              child: [],
            },
            {
              id: '20228',
              name: '1417',
              child: [],
            },
            {
              id: '20240',
              name: '1407',
              child: [],
            },
            {
              id: '20245',
              name: '1404',
              child: [],
            },
            {
              id: '20275',
              name: '1414',
              child: [],
            },
            {
              id: '20300',
              name: '1418',
              child: [],
            },
            {
              id: '20328',
              name: '1411',
              child: [],
            },
            {
              id: '20332',
              name: '1408',
              child: [],
            },
            {
              id: '20337',
              name: '1401',
              child: [],
            },
          ],
        },
        {
          id: '15',
          name: '15',
          child: [
            {
              id: '20025',
              name: '1514',
              child: [],
            },
            {
              id: '20032',
              name: '1507',
              child: [],
            },
            {
              id: '20063',
              name: '1509',
              child: [],
            },
            {
              id: '20079',
              name: '1505',
              child: [],
            },
            {
              id: '20093',
              name: '1503',
              child: [],
            },
            {
              id: '20099',
              name: '1504',
              child: [],
            },
            {
              id: '20107',
              name: '1502',
              child: [],
            },
            {
              id: '20117',
              name: '1520',
              child: [],
            },
            {
              id: '20118',
              name: '1517',
              child: [],
            },
            {
              id: '20132',
              name: '1515',
              child: [],
            },
            {
              id: '20139',
              name: '1516',
              child: [],
            },
            {
              id: '20161',
              name: '1512',
              child: [],
            },
            {
              id: '20246',
              name: '1513',
              child: [],
            },
            {
              id: '20251',
              name: '1506',
              child: [],
            },
            {
              id: '20274',
              name: '1510',
              child: [],
            },
            {
              id: '20293',
              name: '1508',
              child: [],
            },
            {
              id: '20314',
              name: '1511',
              child: [],
            },
            {
              id: '20324',
              name: '1518',
              child: [],
            },
            {
              id: '20343',
              name: '1501',
              child: [],
            },
          ],
        },
        {
          id: '151',
          name: '151',
          child: [
            {
              id: '20185',
              name: '1519',
              child: [],
            },
          ],
        },
        {
          id: '16',
          name: '16',
          child: [
            {
              id: '20019',
              name: '1607',
              child: [],
            },
            {
              id: '20045',
              name: '1605',
              child: [],
            },
            {
              id: '20050',
              name: '1612',
              child: [],
            },
            {
              id: '20081',
              name: '1614',
              child: [],
            },
            {
              id: '20164',
              name: '1620',
              child: [],
            },
            {
              id: '20165',
              name: '1606',
              child: [],
            },
            {
              id: '20175',
              name: '1617',
              child: [],
            },
            {
              id: '20203',
              name: '1613',
              child: [],
            },
            {
              id: '20206',
              name: '1610',
              child: [],
            },
            {
              id: '20212',
              name: '1616',
              child: [],
            },
            {
              id: '20215',
              name: '1603',
              child: [],
            },
            {
              id: '20217',
              name: '1615',
              child: [],
            },
            {
              id: '20219',
              name: '1619',
              child: [],
            },
            {
              id: '20227',
              name: '1604',
              child: [],
            },
            {
              id: '20248',
              name: '1602',
              child: [],
            },
            {
              id: '20276',
              name: '1609',
              child: [],
            },
            {
              id: '20290',
              name: '1618',
              child: [],
            },
            {
              id: '20312',
              name: '1611',
              child: [],
            },
            {
              id: '20318',
              name: '1608',
              child: [],
            },
            {
              id: '20340',
              name: '1601',
              child: [],
            },
          ],
        },
        {
          id: '17',
          name: '17',
          child: [
            {
              id: '20027',
              name: '1717',
              child: [],
            },
            {
              id: '20058',
              name: '1707',
              child: [],
            },
            {
              id: '20061',
              name: '1710',
              child: [],
            },
            {
              id: '20075',
              name: '1716',
              child: [],
            },
            {
              id: '20076',
              name: '1713',
              child: [],
            },
            {
              id: '20091',
              name: '1720',
              child: [],
            },
            {
              id: '20133',
              name: '1706',
              child: [],
            },
            {
              id: '20137',
              name: '1704',
              child: [],
            },
            {
              id: '20140',
              name: '1714',
              child: [],
            },
            {
              id: '20150',
              name: '1715',
              child: [],
            },
            {
              id: '20151',
              name: '1703',
              child: [],
            },
            {
              id: '20169',
              name: '1712',
              child: [],
            },
            {
              id: '20196',
              name: '1705',
              child: [],
            },
            {
              id: '20238',
              name: '1719',
              child: [],
            },
            {
              id: '20258',
              name: '1709',
              child: [],
            },
            {
              id: '20270',
              name: '1702',
              child: [],
            },
            {
              id: '20285',
              name: '1718',
              child: [],
            },
            {
              id: '20287',
              name: '1711',
              child: [],
            },
            {
              id: '20291',
              name: '1708',
              child: [],
            },
            {
              id: '20348',
              name: '1701',
              child: [],
            },
          ],
        },
        {
          id: '18',
          name: '18',
          child: [
            {
              id: '20026',
              name: '1809',
              child: [],
            },
            {
              id: '20055',
              name: '1804',
              child: [],
            },
            {
              id: '20069',
              name: '1819',
              child: [],
            },
            {
              id: '20086',
              name: '1806',
              child: [],
            },
            {
              id: '20097',
              name: '1803',
              child: [],
            },
            {
              id: '20114',
              name: '1817',
              child: [],
            },
            {
              id: '20127',
              name: '1805',
              child: [],
            },
            {
              id: '20135',
              name: '1810',
              child: [],
            },
            {
              id: '20144',
              name: '1816',
              child: [],
            },
            {
              id: '20155',
              name: '1815',
              child: [],
            },
            {
              id: '20158',
              name: '1812',
              child: [],
            },
            {
              id: '20162',
              name: '1813',
              child: [],
            },
            {
              id: '20186',
              name: '1807',
              child: [],
            },
            {
              id: '20204',
              name: '1802',
              child: [],
            },
            {
              id: '20207',
              name: '1820',
              child: [],
            },
            {
              id: '20216',
              name: '1814',
              child: [],
            },
            {
              id: '20289',
              name: '1808',
              child: [],
            },
            {
              id: '20296',
              name: '1811',
              child: [],
            },
            {
              id: '20315',
              name: '1818',
              child: [],
            },
            {
              id: '20341',
              name: '1801',
              child: [],
            },
          ],
        },
        {
          id: '19',
          name: '19',
          child: [
            {
              id: '20021',
              name: '1916',
              child: [],
            },
            {
              id: '20031',
              name: '1904',
              child: [],
            },
            {
              id: '20034',
              name: '1914',
              child: [],
            },
            {
              id: '20054',
              name: '1903',
              child: [],
            },
            {
              id: '20059',
              name: '1909',
              child: [],
            },
            {
              id: '20100',
              name: '1907',
              child: [],
            },
            {
              id: '20113',
              name: '1906',
              child: [],
            },
            {
              id: '20157',
              name: '1902',
              child: [],
            },
            {
              id: '20179',
              name: '1912',
              child: [],
            },
            {
              id: '20195',
              name: '1910',
              child: [],
            },
            {
              id: '20224',
              name: '1905',
              child: [],
            },
            {
              id: '20252',
              name: '1917',
              child: [],
            },
            {
              id: '20254',
              name: '1915',
              child: [],
            },
            {
              id: '20257',
              name: '1913',
              child: [],
            },
            {
              id: '20263',
              name: '1919',
              child: [],
            },
            {
              id: '20268',
              name: '1920',
              child: [],
            },
            {
              id: '20295',
              name: '1918',
              child: [],
            },
            {
              id: '20306',
              name: '1908',
              child: [],
            },
            {
              id: '20323',
              name: '1911',
              child: [],
            },
            {
              id: '20347',
              name: '1901',
              child: [],
            },
          ],
        },
        {
          id: '20',
          name: '20',
          child: [
            {
              id: '20035',
              name: '2005',
              child: [],
            },
            {
              id: '20046',
              name: '2004',
              child: [],
            },
            {
              id: '20052',
              name: '2012',
              child: [],
            },
            {
              id: '20053',
              name: '2006',
              child: [],
            },
            {
              id: '20057',
              name: '2002',
              child: [],
            },
            {
              id: '20070',
              name: '2009',
              child: [],
            },
            {
              id: '20074',
              name: '2013',
              child: [],
            },
            {
              id: '20080',
              name: '2015',
              child: [],
            },
            {
              id: '20088',
              name: '2016',
              child: [],
            },
            {
              id: '20129',
              name: '2017',
              child: [],
            },
            {
              id: '20159',
              name: '2019',
              child: [],
            },
            {
              id: '20184',
              name: '2020',
              child: [],
            },
            {
              id: '20198',
              name: '2007',
              child: [],
            },
            {
              id: '20209',
              name: '2014',
              child: [],
            },
            {
              id: '20221',
              name: '2010',
              child: [],
            },
            {
              id: '20259',
              name: '2003',
              child: [],
            },
            {
              id: '20286',
              name: '2011',
              child: [],
            },
            {
              id: '20310',
              name: '2018',
              child: [],
            },
            {
              id: '20317',
              name: '2008',
              child: [],
            },
            {
              id: '20334',
              name: '2001',
              child: [],
            },
          ],
        },
        {
          id: '21',
          name: '21',
          child: [
            {
              id: '20018',
              name: '2112',
              child: [],
            },
            {
              id: '20085',
              name: '2104',
              child: [],
            },
            {
              id: '20108',
              name: '2113',
              child: [],
            },
            {
              id: '20124',
              name: '2105',
              child: [],
            },
            {
              id: '20142',
              name: '2109',
              child: [],
            },
            {
              id: '20145',
              name: '2110',
              child: [],
            },
            {
              id: '20168',
              name: '2106',
              child: [],
            },
            {
              id: '20180',
              name: '2119',
              child: [],
            },
            {
              id: '20182',
              name: '2117',
              child: [],
            },
            {
              id: '20205',
              name: '2107',
              child: [],
            },
            {
              id: '20234',
              name: '2120',
              child: [],
            },
            {
              id: '20264',
              name: '2102',
              child: [],
            },
            {
              id: '20265',
              name: '2103',
              child: [],
            },
            {
              id: '20292',
              name: '2108',
              child: [],
            },
            {
              id: '20313',
              name: '2118',
              child: [],
            },
            {
              id: '20325',
              name: '2111',
              child: [],
            },
            {
              id: '20344',
              name: '2101',
              child: [],
            },
          ],
        },
        {
          id: '22',
          name: '22',
          child: [
            {
              id: '20036',
              name: '2205',
              child: [],
            },
            {
              id: '20042',
              name: '2213',
              child: [],
            },
            {
              id: '20066',
              name: '2210',
              child: [],
            },
            {
              id: '20082',
              name: '2219',
              child: [],
            },
            {
              id: '20128',
              name: '2217',
              child: [],
            },
            {
              id: '20171',
              name: '2203',
              child: [],
            },
            {
              id: '20173',
              name: '2204',
              child: [],
            },
            {
              id: '20177',
              name: '2209',
              child: [],
            },
            {
              id: '20192',
              name: '2212',
              child: [],
            },
            {
              id: '20210',
              name: '2206',
              child: [],
            },
            {
              id: '20236',
              name: '2220',
              child: [],
            },
            {
              id: '20250',
              name: '2207',
              child: [],
            },
            {
              id: '20267',
              name: '2202',
              child: [],
            },
            {
              id: '20301',
              name: '2218',
              child: [],
            },
            {
              id: '20302',
              name: '2208',
              child: [],
            },
            {
              id: '20322',
              name: '2211',
              child: [],
            },
            {
              id: '20342',
              name: '2201',
              child: [],
            },
          ],
        },
        {
          id: '23',
          name: '23',
          child: [
            {
              id: '20023',
              name: '2309',
              child: [],
            },
            {
              id: '20028',
              name: '2310',
              child: [],
            },
            {
              id: '20049',
              name: '2307',
              child: [],
            },
            {
              id: '20094',
              name: '2317',
              child: [],
            },
            {
              id: '20098',
              name: '2312',
              child: [],
            },
            {
              id: '20148',
              name: '2320',
              child: [],
            },
            {
              id: '20156',
              name: '2303',
              child: [],
            },
            {
              id: '20172',
              name: '2313',
              child: [],
            },
            {
              id: '20176',
              name: '2304',
              child: [],
            },
            {
              id: '20218',
              name: '2302',
              child: [],
            },
            {
              id: '20231',
              name: '2319',
              child: [],
            },
            {
              id: '20232',
              name: '2316',
              child: [],
            },
            {
              id: '20243',
              name: '2305',
              child: [],
            },
            {
              id: '20256',
              name: '2314',
              child: [],
            },
            {
              id: '20272',
              name: '2306',
              child: [],
            },
            {
              id: '20279',
              name: '2315',
              child: [],
            },
            {
              id: '20283',
              name: '2318',
              child: [],
            },
            {
              id: '20297',
              name: '2311',
              child: [],
            },
            {
              id: '20331',
              name: '2308',
              child: [],
            },
            {
              id: '20333',
              name: '2301',
              child: [],
            },
          ],
        },
        {
          id: '24',
          name: '24',
          child: [
            {
              id: '20103',
              name: '2413',
              child: [],
            },
            {
              id: '20106',
              name: '2414',
              child: [],
            },
            {
              id: '20112',
              name: '2416',
              child: [],
            },
            {
              id: '20115',
              name: '2407',
              child: [],
            },
            {
              id: '20119',
              name: '2410',
              child: [],
            },
            {
              id: '20125',
              name: '2419',
              child: [],
            },
            {
              id: '20131',
              name: '2412',
              child: [],
            },
            {
              id: '20143',
              name: '2415',
              child: [],
            },
            {
              id: '20147',
              name: '2409',
              child: [],
            },
            {
              id: '20166',
              name: '2406',
              child: [],
            },
            {
              id: '20170',
              name: '2417',
              child: [],
            },
            {
              id: '20181',
              name: '2420',
              child: [],
            },
            {
              id: '20183',
              name: '2404',
              child: [],
            },
            {
              id: '20187',
              name: '2403',
              child: [],
            },
            {
              id: '20237',
              name: '2402',
              child: [],
            },
            {
              id: '20273',
              name: '2405',
              child: [],
            },
            {
              id: '20316',
              name: '2408',
              child: [],
            },
            {
              id: '20320',
              name: '2411',
              child: [],
            },
            {
              id: '20327',
              name: '2418',
              child: [],
            },
            {
              id: '20336',
              name: '2401',
              child: [],
            },
          ],
        },
        {
          id: '25',
          name: '25',
          child: [
            {
              id: '20017',
              name: '2505',
              child: [],
            },
            {
              id: '20024',
              name: '2520',
              child: [],
            },
            {
              id: '20033',
              name: '2516',
              child: [],
            },
            {
              id: '20044',
              name: '2517',
              child: [],
            },
            {
              id: '20084',
              name: '2502',
              child: [],
            },
            {
              id: '20121',
              name: '2506',
              child: [],
            },
            {
              id: '20130',
              name: '2504',
              child: [],
            },
            {
              id: '20167',
              name: '2510',
              child: [],
            },
            {
              id: '20174',
              name: '2515',
              child: [],
            },
            {
              id: '20189',
              name: '2509',
              child: [],
            },
            {
              id: '20191',
              name: '2519',
              child: [],
            },
            {
              id: '20220',
              name: '2512',
              child: [],
            },
            {
              id: '20222',
              name: '2503',
              child: [],
            },
            {
              id: '20233',
              name: '2514',
              child: [],
            },
            {
              id: '20235',
              name: '2513',
              child: [],
            },
            {
              id: '20247',
              name: '2507',
              child: [],
            },
            {
              id: '20282',
              name: '2508',
              child: [],
            },
            {
              id: '20304',
              name: '2518',
              child: [],
            },
            {
              id: '20307',
              name: '2511',
              child: [],
            },
            {
              id: '20345',
              name: '2501',
              child: [],
            },
          ],
        },
        {
          id: '26',
          name: '26',
          child: [
            {
              id: '20020',
              name: '2605',
              child: [],
            },
            {
              id: '20030',
              name: '2616',
              child: [],
            },
            {
              id: '20039',
              name: '2620',
              child: [],
            },
            {
              id: '20072',
              name: '2604',
              child: [],
            },
            {
              id: '20101',
              name: '2603',
              child: [],
            },
            {
              id: '20111',
              name: '2610',
              child: [],
            },
            {
              id: '20116',
              name: '2617',
              child: [],
            },
            {
              id: '20134',
              name: '2612',
              child: [],
            },
            {
              id: '20152',
              name: '2607',
              child: [],
            },
            {
              id: '20160',
              name: '2615',
              child: [],
            },
            {
              id: '20208',
              name: '2619',
              child: [],
            },
            {
              id: '20223',
              name: '2609',
              child: [],
            },
            {
              id: '20229',
              name: '2613',
              child: [],
            },
            {
              id: '20239',
              name: '2602',
              child: [],
            },
            {
              id: '20261',
              name: '2606',
              child: [],
            },
            {
              id: '20266',
              name: '2614',
              child: [],
            },
            {
              id: '20298',
              name: '2618',
              child: [],
            },
            {
              id: '20305',
              name: '2611',
              child: [],
            },
            {
              id: '20321',
              name: '2608',
              child: [],
            },
            {
              id: '20346',
              name: '2601',
              child: [],
            },
          ],
        },
      ],
    },
    {
      id: '12',
      name: '12',
      child: [
        {
          id: '1',
          name: '1',
          child: [
            {
              id: '190288',
              name: '5555',
              child: [],
            },
            {
              id: '190301',
              name: '10001',
              child: [],
            },
          ],
        },
      ],
    },
    {
      id: '21',
      name: '21',
      child: [
        {
          id: '1',
          name: '1',
          child: [
            {
              id: '190274',
              name: '123',
              child: [],
            },
          ],
        },
      ],
    },
    {
      id: '22',
      name: '22',
      child: [
        {
          id: '22',
          name: '22',
          child: [
            {
              id: '190306',
              name: '111112',
              child: [],
            },
          ],
        },
      ],
    },
    {
      id: '26',
      name: '26',
      child: [
        {
          id: '2',
          name: '2',
          child: [
            {
              id: '190285',
              name: '66658',
              child: [],
            },
          ],
        },
      ],
    },
    {
      id: '33',
      name: '33',
      child: [
        {
          id: '1',
          name: '1',
          child: [
            {
              id: '190287',
              name: '3333',
              child: [],
            },
          ],
        },
      ],
    },
    {
      id: '34',
      name: '34',
      child: [
        {
          id: '1',
          name: '1',
          child: [
            {
              id: '190286',
              name: '4444',
              child: [],
            },
          ],
        },
      ],
    },
    {
      id: '100',
      name: '100',
      child: [
        {
          id: '100',
          name: '100',
          child: [
            {
              id: '190268',
              name: '测试账单',
              child: [],
            },
            {
              id: '190270',
              name: '1011',
              child: [],
            },
            {
              id: '190276',
              name: 'test',
              child: [],
            },
            {
              id: '190283',
              name: '999',
              child: [],
            },
          ],
        },
      ],
    },
  ],
  timestamp: 1585742930273,
};
const pricedata = {
  status: 'ok',
  msg: 'ok',
  data: {
    isolationDay: 14,
    roomPrice: 240,
    payAmount: 3360,
  },
  timestamp: 1585742930273,
};

Mock.mock('/covid/getPrice', 'get', pricedata);

Mock.mock('/covid/rooms/list', 'get', roomList);

Mock.mock('/app-server/api/v1/h5Pay/getBillByToken', 'get', billDetail);

Mock.mock('/app-server/api/v1/h5Pay/getPayOrderByToken', 'get', orderDetail);

Mock.mock('/app-server/api/v1/h5Pay/doPay', 'post', doPay);

