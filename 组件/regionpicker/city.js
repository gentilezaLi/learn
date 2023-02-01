
const citylist = [
  { "cname": "阿拉善盟", "cid": "152900", "pid": "150000", "letter": "A" },
  { "cname": "鞍山", "cid": "210300", "pid": "210000", "letter": "A" },
  { "cname": "安庆", "cid": "340800", "pid": "340000", "letter": "A" },
  { "cname": "安阳", "cid": "410500", "pid": "410000", "letter": "A" },
  { "cname": "阿坝", "cid": "513200", "pid": "510000", "letter": "A" },
  { "cname": "安顺", "cid": "520400", "pid": "520000", "letter": "A" },
  { "cname": "阿里", "cid": "542500", "pid": "540000", "letter": "A" },
  { "cname": "安康", "cid": "610900", "pid": "610000", "letter": "A" },
  { "cname": "阿克苏", "cid": "652900", "pid": "650000", "letter": "A" },
  { "cname": "阿勒泰", "cid": "654300", "pid": "650000", "letter": "A" },
  { "cname": "阿拉尔", "cid": "655200", "pid": "650000", "letter": "A" },
  { "cname": "澳门", "cid": "820100", "pid": "820000", "letter": "A" },
  { "cname": "博尔塔拉", "cid": "652700", "pid": "650000", "letter": "B" },
  { "cname": "巴音郭楞", "cid": "652800", "pid": "650000", "letter": "B" },
  { "cname": "白银", "cid": "620400", "pid": "620000", "letter": "B" },
  { "cname": "宝鸡", "cid": "610300", "pid": "610000", "letter": "B" },
  { "cname": "保山", "cid": "530500", "pid": "530000", "letter": "B" },
  { "cname": "毕节", "cid": "522400", "pid": "520000", "letter": "B" },
  { "cname": "巴中", "cid": "511900", "pid": "510000", "letter": "B" },
  { "cname": "保亭", "cid": "462500", "pid": "460000", "letter": "B" },
  { "cname": "北海", "cid": "450500", "pid": "450000", "letter": "B" },
  { "cname": "百色", "cid": "451000", "pid": "450000", "letter": "B" },
  { "cname": "白沙", "cid": "462100", "pid": "460000", "letter": "B" },
  { "cname": "滨州", "cid": "371600", "pid": "370000", "letter": "B" },
  { "cname": "亳州", "cid": "341600", "pid": "340000", "letter": "B" },
  { "cname": "蚌埠", "cid": "340300", "pid": "340000", "letter": "B" },
  { "cname": "本溪", "cid": "210500", "pid": "210000", "letter": "B" },
  { "cname": "北宁", "cid": "211500", "pid": "210000", "letter": "B" },
  { "cname": "白山", "cid": "220600", "pid": "220000", "letter": "B" },
  { "cname": "白城", "cid": "220800", "pid": "220000", "letter": "B" },
  { "cname": "北京", "cid": "110100", "pid": "110000", "letter": "B" },
  { "cname": "保定", "cid": "130600", "pid": "130000", "letter": "B" },
  { "cname": "包头", "cid": "150200", "pid": "150000", "letter": "B" },
  { "cname": "巴彦淖尔", "cid": "150800", "pid": "150000", "letter": "B" },
  { "cname": "赤峰", "cid": "150400", "pid": "150000", "letter": "C" },
  { "cname": "承德", "cid": "130800", "pid": "130000", "letter": "C" },
  { "cname": "沧州", "cid": "130900", "pid": "130000", "letter": "C" },
  { "cname": "长治", "cid": "140400", "pid": "140000", "letter": "C" },
  { "cname": "长春", "cid": "220100", "pid": "220000", "letter": "C" },
  { "cname": "朝阳", "cid": "211300", "pid": "210000", "letter": "C" },
  { "cname": "常州", "cid": "320400", "pid": "320000", "letter": "C" },
  { "cname": "池州", "cid": "341700", "pid": "340000", "letter": "C" },
  { "cname": "滁州", "cid": "341100", "pid": "340000", "letter": "C" },
  { "cname": "巢湖", "cid": "341400", "pid": "340000", "letter": "C" },
  { "cname": "长沙", "cid": "430100", "pid": "430000", "letter": "C" },
  { "cname": "常德", "cid": "430700", "pid": "430000", "letter": "C" },
  { "cname": "郴州", "cid": "431000", "pid": "430000", "letter": "C" },
  { "cname": "昌江", "cid": "462200", "pid": "460000", "letter": "C" },
  { "cname": "澄迈", "cid": "461900", "pid": "460000", "letter": "C" },
  { "cname": "崇左", "cid": "451400", "pid": "450000", "letter": "C" },
  { "cname": "潮州", "cid": "445100", "pid": "440000", "letter": "C" },
  { "cname": "重庆", "cid": "500100", "pid": "500000", "letter": "C" },
  { "cname": "成都", "cid": "510100", "pid": "510000", "letter": "C" },
  { "cname": "楚雄", "cid": "532300", "pid": "530000", "letter": "C" },
  { "cname": "昌都", "cid": "542100", "pid": "540000", "letter": "C" },
  { "cname": "昌吉", "cid": "652300", "pid": "650000", "letter": "C" },
  { "cname": "迪庆", "cid": "533400", "pid": "530000", "letter": "D" },
  { "cname": "大理", "cid": "532900", "pid": "530000", "letter": "D" },
  { "cname": "德宏", "cid": "533100", "pid": "530000", "letter": "D" },
  { "cname": "定西", "cid": "621100", "pid": "620000", "letter": "D" },
  { "cname": "德阳", "cid": "510600", "pid": "510000", "letter": "D" },
  { "cname": "达州", "cid": "511700", "pid": "510000", "letter": "D" },
  { "cname": "东莞", "cid": "441900", "pid": "440000", "letter": "D" },
  { "cname": "儋州", "cid": "461300", "pid": "460000", "letter": "D" },
  { "cname": "东方", "cid": "461600", "pid": "460000", "letter": "D" },
  { "cname": "定安", "cid": "461700", "pid": "460000", "letter": "D" },
  { "cname": "德州", "cid": "371400", "pid": "370000", "letter": "D" },
  { "cname": "东营", "cid": "370500", "pid": "370000", "letter": "D" },
  { "cname": "大兴安岭", "cid": "232700", "pid": "230000", "letter": "D" },
  { "cname": "丹东", "cid": "210600", "pid": "210000", "letter": "D" },
  { "cname": "大连", "cid": "210200", "pid": "210000", "letter": "D" },
  { "cname": "大庆", "cid": "230600", "pid": "230000", "letter": "D" },
  { "cname": "大同", "cid": "140200", "pid": "140000", "letter": "D" },
  { "cname": "鄂尔多斯", "cid": "150600", "pid": "150000", "letter": "E" },
  { "cname": "鄂州", "cid": "420700", "pid": "420000", "letter": "E" },
  { "cname": "恩施", "cid": "422800", "pid": "420000", "letter": "E" },
  { "cname": "佛山", "cid": "440600", "pid": "440000", "letter": "F" },
  { "cname": "防城港", "cid": "450600", "pid": "450000", "letter": "F" },
  { "cname": "抚顺", "cid": "210400", "pid": "210000", "letter": "F" },
  { "cname": "阜新", "cid": "210900", "pid": "210000", "letter": "F" },
  { "cname": "阜阳", "cid": "341200", "pid": "340000", "letter": "F" },
  { "cname": "福州", "cid": "350100", "pid": "350000", "letter": "F" },
  { "cname": "抚州", "cid": "361000", "pid": "360000", "letter": "F" },
  { "cname": "赣州", "cid": "360700", "pid": "360000", "letter": "G" },
  { "cname": "桂林", "cid": "450300", "pid": "450000", "letter": "G" },
  { "cname": "贵港", "cid": "450800", "pid": "450000", "letter": "G" },
  { "cname": "甘孜", "cid": "513300", "pid": "510000", "letter": "G" },
  { "cname": "广安", "cid": "511600", "pid": "510000", "letter": "G" },
  { "cname": "贵阳", "cid": "520100", "pid": "520000", "letter": "G" },
  { "cname": "广元", "cid": "510800", "pid": "510000", "letter": "G" },
  { "cname": "广州", "cid": "440100", "pid": "440000", "letter": "G" },
  { "cname": "甘南", "cid": "623000", "pid": "620000", "letter": "G" },
  { "cname": "果洛", "cid": "632600", "pid": "630000", "letter": "G" },
  { "cname": "固原", "cid": "640400", "pid": "640000", "letter": "G" },
  { "cname": "海西", "cid": "632800", "pid": "630000", "letter": "H" },
  { "cname": "哈密", "cid": "652200", "pid": "650000", "letter": "H" },
  { "cname": "海东", "cid": "632100", "pid": "630000", "letter": "H" },
  { "cname": "海北", "cid": "632200", "pid": "630000", "letter": "H" },
  { "cname": "黄南", "cid": "632300", "pid": "630000", "letter": "H" },
  { "cname": "海南", "cid": "632500", "pid": "630000", "letter": "H" },
  { "cname": "红河", "cid": "532500", "pid": "530000", "letter": "H" },
  { "cname": "汉中", "cid": "610700", "pid": "610000", "letter": "H" },
  { "cname": "和田", "cid": "653200", "pid": "650000", "letter": "H" },
  { "cname": "怀化", "cid": "431200", "pid": "430000", "letter": "H" },
  { "cname": "惠州", "cid": "441300", "pid": "440000", "letter": "H" },
  { "cname": "河源", "cid": "441600", "pid": "440000", "letter": "H" },
  { "cname": "黄冈", "cid": "421100", "pid": "420000", "letter": "H" },
  { "cname": "衡阳", "cid": "430400", "pid": "430000", "letter": "H" },
  { "cname": "黄石", "cid": "420200", "pid": "420000", "letter": "H" },
  { "cname": "菏泽", "cid": "371700", "pid": "370000", "letter": "H" },
  { "cname": "鹤壁", "cid": "410600", "pid": "410000", "letter": "H" },
  { "cname": "海口", "cid": "460100", "pid": "460000", "letter": "H" },
  { "cname": "贺州", "cid": "451100", "pid": "450000", "letter": "H" },
  { "cname": "河池", "cid": "451200", "pid": "450000", "letter": "H" },
  { "cname": "黄山", "cid": "341000", "pid": "340000", "letter": "H" },
  { "cname": "淮北", "cid": "340600", "pid": "340000", "letter": "H" },
  { "cname": "黑河", "cid": "231100", "pid": "230000", "letter": "H" },
  { "cname": "淮安", "cid": "320800", "pid": "320000", "letter": "H" },
  { "cname": "淮南", "cid": "340400", "pid": "340000", "letter": "H" },
  { "cname": "合肥", "cid": "340100", "pid": "340000", "letter": "H" },
  { "cname": "杭州", "cid": "330100", "pid": "330000", "letter": "H" },
  { "cname": "湖州", "cid": "330500", "pid": "330000", "letter": "H" },
  { "cname": "葫芦岛", "cid": "211400", "pid": "210000", "letter": "H" },
  { "cname": "呼和浩特", "cid": "150100", "pid": "150000", "letter": "H" },
  { "cname": "鹤岗", "cid": "230400", "pid": "230000", "letter": "H" },
  { "cname": "哈尔滨", "cid": "230100", "pid": "230000", "letter": "H" },
  { "cname": "呼伦贝尔", "cid": "150700", "pid": "150000", "letter": "H" },
  { "cname": "衡水", "cid": "131100", "pid": "130000", "letter": "H" },
  { "cname": "邯郸", "cid": "130400", "pid": "130000", "letter": "H" },
  { "cname": "晋城", "cid": "140500", "pid": "140000", "letter": "J" },
  { "cname": "晋中", "cid": "140700", "pid": "140000", "letter": "J" },
  { "cname": "吉林", "cid": "220200", "pid": "220000", "letter": "J" },
  { "cname": "锦州", "cid": "210700", "pid": "210000", "letter": "J" },
  { "cname": "金华", "cid": "330700", "pid": "330000", "letter": "J" },
  { "cname": "嘉兴", "cid": "330400", "pid": "330000", "letter": "J" },
  { "cname": "佳木斯", "cid": "230800", "pid": "230000", "letter": "J" },
  { "cname": "鸡西", "cid": "230300", "pid": "230000", "letter": "J" },
  { "cname": "吉安", "cid": "360800", "pid": "360000", "letter": "J" },
  { "cname": "济南", "cid": "370100", "pid": "370000", "letter": "J" },
  { "cname": "景德镇", "cid": "360200", "pid": "360000", "letter": "J" },
  { "cname": "九江", "cid": "360400", "pid": "360000", "letter": "J" },
  { "cname": "揭阳", "cid": "445200", "pid": "440000", "letter": "J" },
  { "cname": "济宁", "cid": "370800", "pid": "370000", "letter": "J" },
  { "cname": "济源市", "cid": "419000", "pid": "410000", "letter": "J" },
  { "cname": "荆门", "cid": "420800", "pid": "420000", "letter": "J" },
  { "cname": "荆州", "cid": "421000", "pid": "420000", "letter": "J" },
  { "cname": "焦作", "cid": "410800", "pid": "410000", "letter": "J" },
  { "cname": "江门", "cid": "440700", "pid": "440000", "letter": "J" },
  { "cname": "嘉峪关", "cid": "620200", "pid": "620000", "letter": "J" },
  { "cname": "金昌", "cid": "620300", "pid": "620000", "letter": "J" },
  { "cname": "酒泉", "cid": "620900", "pid": "620000", "letter": "J" },
  { "cname": "克拉玛依", "cid": "650200", "pid": "650000", "letter": "K" },
  { "cname": "克孜勒苏", "cid": "653000", "pid": "650000", "letter": "K" },
  { "cname": "喀什", "cid": "653100", "pid": "650000", "letter": "K" },
  { "cname": "昆明", "cid": "530100", "pid": "530000", "letter": "K" },
  { "cname": "开封", "cid": "410200", "pid": "410000", "letter": "K" },
  { "cname": "洛阳", "cid": "410300", "pid": "410000", "letter": "L" },
  { "cname": "聊城", "cid": "371500", "pid": "370000", "letter": "L" },
  { "cname": "莱芜", "cid": "371200", "pid": "370000", "letter": "L" },
  { "cname": "临沂", "cid": "371300", "pid": "370000", "letter": "L" },
  { "cname": "漯河", "cid": "411100", "pid": "410000", "letter": "L" },
  { "cname": "娄底", "cid": "431300", "pid": "430000", "letter": "L" },
  { "cname": "柳州", "cid": "450200", "pid": "450000", "letter": "L" },
  { "cname": "来宾", "cid": "451300", "pid": "450000", "letter": "L" },
  { "cname": "临高", "cid": "462000", "pid": "460000", "letter": "L" },
  { "cname": "乐东", "cid": "462300", "pid": "460000", "letter": "L" },
  { "cname": "陵水", "cid": "462400", "pid": "460000", "letter": "L" },
  { "cname": "泸州", "cid": "510500", "pid": "510000", "letter": "L" },
  { "cname": "乐山", "cid": "511100", "pid": "510000", "letter": "L" },
  { "cname": "六盘水", "cid": "520200", "pid": "520000", "letter": "L" },
  { "cname": "凉山", "cid": "513400", "pid": "510000", "letter": "L" },
  { "cname": "丽水", "cid": "331100", "pid": "330000", "letter": "L" },
  { "cname": "龙岩", "cid": "350800", "pid": "350000", "letter": "L" },
  { "cname": "六安", "cid": "341500", "pid": "340000", "letter": "L" },
  { "cname": "连云港", "cid": "320700", "pid": "320000", "letter": "L" },
  { "cname": "辽阳", "cid": "211000", "pid": "210000", "letter": "L" },
  { "cname": "辽源", "cid": "220400", "pid": "220000", "letter": "L" },
  { "cname": "临汾", "cid": "141000", "pid": "140000", "letter": "L" },
  { "cname": "吕梁", "cid": "141100", "pid": "140000", "letter": "L" },
  { "cname": "廊坊", "cid": "131000", "pid": "130000", "letter": "L" },
  { "cname": "丽江", "cid": "530700", "pid": "530000", "letter": "L" },
  { "cname": "拉萨", "cid": "540100", "pid": "540000", "letter": "L" },
  { "cname": "林芝", "cid": "542600", "pid": "540000", "letter": "L" },
  { "cname": "临沧", "cid": "530900", "pid": "530000", "letter": "L" },
  { "cname": "兰州", "cid": "620100", "pid": "620000", "letter": "L" },
  { "cname": "陇南", "cid": "621200", "pid": "620000", "letter": "L" },
  { "cname": "临夏", "cid": "622900", "pid": "620000", "letter": "L" },
  { "cname": "米泉", "cid": "650300", "pid": "650000", "letter": "M" },
  { "cname": "马鞍山", "cid": "340500", "pid": "340000", "letter": "M" },
  { "cname": "牡丹江", "cid": "231000", "pid": "230000", "letter": "M" },
  { "cname": "眉山", "cid": "511400", "pid": "510000", "letter": "M" },
  { "cname": "绵阳", "cid": "510700", "pid": "510000", "letter": "M" },
  { "cname": "茂名", "cid": "440900", "pid": "440000", "letter": "M" },
  { "cname": "梅州", "cid": "441400", "pid": "440000", "letter": "M" },
  { "cname": "南阳", "cid": "411300", "pid": "410000", "letter": "N" },
  { "cname": "南充", "cid": "511300", "pid": "510000", "letter": "N" },
  { "cname": "内江", "cid": "511000", "pid": "510000", "letter": "N" },
  { "cname": "南沙群岛", "cid": "462800", "pid": "460000", "letter": "N" },
  { "cname": "南宁", "cid": "450100", "pid": "450000", "letter": "N" },
  { "cname": "南京", "cid": "320100", "pid": "320000", "letter": "N" },
  { "cname": "南通", "cid": "320600", "pid": "320000", "letter": "N" },
  { "cname": "宁波", "cid": "330200", "pid": "330000", "letter": "N" },
  { "cname": "宁德", "cid": "350900", "pid": "350000", "letter": "N" },
  { "cname": "南昌", "cid": "360100", "pid": "360000", "letter": "N" },
  { "cname": "南平", "cid": "350700", "pid": "350000", "letter": "N" },
  { "cname": "那曲", "cid": "542400", "pid": "540000", "letter": "N" },
  { "cname": "怒江", "cid": "533300", "pid": "530000", "letter": "N" },
  { "cname": "普洱", "cid": "530800", "pid": "530000", "letter": "P" },
  { "cname": "平凉", "cid": "620800", "pid": "620000", "letter": "P" },
  { "cname": "萍乡", "cid": "360300", "pid": "360000", "letter": "P" },
  { "cname": "莆田", "cid": "350300", "pid": "350000", "letter": "P" },
  { "cname": "盘锦", "cid": "211100", "pid": "210000", "letter": "P" },
  { "cname": "攀枝花", "cid": "510400", "pid": "510000", "letter": "P" },
  { "cname": "濮阳", "cid": "410900", "pid": "410000", "letter": "P" },
  { "cname": "平顶山", "cid": "410400", "pid": "410000", "letter": "P" },
  { "cname": "潜江", "cid": "423200", "pid": "420000", "letter": "Q" },
  { "cname": "琼海", "cid": "461200", "pid": "460000", "letter": "Q" },
  { "cname": "琼中", "cid": "462600", "pid": "460000", "letter": "Q" },
  { "cname": "黔西南", "cid": "522300", "pid": "520000", "letter": "Q" },
  { "cname": "黔东南", "cid": "522600", "pid": "520000", "letter": "Q" },
  { "cname": "黔南", "cid": "522700", "pid": "520000", "letter": "Q" },
  { "cname": "清远", "cid": "441800", "pid": "440000", "letter": "Q" },
  { "cname": "钦州", "cid": "450700", "pid": "450000", "letter": "Q" },
  { "cname": "齐齐哈尔", "cid": "230200", "pid": "230000", "letter": "Q" },
  { "cname": "秦皇岛", "cid": "130300", "pid": "130000", "letter": "Q" },
  { "cname": "泉州", "cid": "350500", "pid": "350000", "letter": "Q" },
  { "cname": "青岛", "cid": "370200", "pid": "370000", "letter": "Q" },
  { "cname": "衢州", "cid": "330800", "pid": "330000", "letter": "Q" },
  { "cname": "七台河", "cid": "230900", "pid": "230000", "letter": "Q" },
  { "cname": "庆阳", "cid": "621000", "pid": "620000", "letter": "Q" },
  { "cname": "曲靖", "cid": "530300", "pid": "530000", "letter": "Q" },
  { "cname": "日喀则", "cid": "542300", "pid": "540000", "letter": "R" },
  { "cname": "日照", "cid": "371100", "pid": "370000", "letter": "R" },
  { "cname": "三门峡", "cid": "411200", "pid": "410000", "letter": "S" },
  { "cname": "商丘", "cid": "411400", "pid": "410000", "letter": "S" },
  { "cname": "十堰", "cid": "420300", "pid": "420000", "letter": "S" },
  { "cname": "随州", "cid": "421300", "pid": "420000", "letter": "S" },
  { "cname": "神农架", "cid": "423400", "pid": "420000", "letter": "S" },
  { "cname": "邵阳", "cid": "430500", "pid": "430000", "letter": "S" },
  { "cname": "汕尾", "cid": "441500", "pid": "440000", "letter": "S" },
  { "cname": "韶关", "cid": "440200", "pid": "440000", "letter": "S" },
  { "cname": "深圳", "cid": "440300", "pid": "440000", "letter": "S" },
  { "cname": "汕头", "cid": "440500", "pid": "440000", "letter": "S" },
  { "cname": "三亚", "cid": "460200", "pid": "460000", "letter": "S" },
  { "cname": "遂宁", "cid": "510900", "pid": "510000", "letter": "S" },
  { "cname": "绥化", "cid": "231200", "pid": "230000", "letter": "S" },
  { "cname": "上海", "cid": "310100", "pid": "310000", "letter": "S" },
  { "cname": "苏州", "cid": "320500", "pid": "320000", "letter": "S" },
  { "cname": "绍兴", "cid": "330600", "pid": "330000", "letter": "S" },
  { "cname": "宿迁", "cid": "321300", "pid": "320000", "letter": "S" },
  { "cname": "上饶", "cid": "361100", "pid": "360000", "letter": "S" },
  { "cname": "三明", "cid": "350400", "pid": "350000", "letter": "S" },
  { "cname": "宿州", "cid": "341300", "pid": "340000", "letter": "S" },
  { "cname": "朔州", "cid": "140600", "pid": "140000", "letter": "S" },
  { "cname": "石家庄", "cid": "130100", "pid": "130000", "letter": "S" },
  { "cname": "双鸭山", "cid": "230500", "pid": "230000", "letter": "S" },
  { "cname": "松原", "cid": "220700", "pid": "220000", "letter": "S" },
  { "cname": "四平", "cid": "220300", "pid": "220000", "letter": "S" },
  { "cname": "沈阳", "cid": "210100", "pid": "210000", "letter": "S" },
  { "cname": "商洛", "cid": "611000", "pid": "610000", "letter": "S" },
  { "cname": "山南", "cid": "542200", "pid": "540000", "letter": "S" },
  { "cname": "石嘴山", "cid": "640200", "pid": "640000", "letter": "S" },
  { "cname": "石河子", "cid": "655100", "pid": "650000", "letter": "S" },
  { "cname": "图木舒克", "cid": "655300", "pid": "650000", "letter": "T" },
  { "cname": "塔城", "cid": "654200", "pid": "650000", "letter": "T" },
  { "cname": "台湾", "cid": "710100", "pid": "710000", "letter": "T" },
  { "cname": "吐鲁番", "cid": "652100", "pid": "650000", "letter": "T" },
  { "cname": "天水", "cid": "620500", "pid": "620000", "letter": "T" },
  { "cname": "铜川", "cid": "610200", "pid": "610000", "letter": "T" },
  { "cname": "铁岭", "cid": "211200", "pid": "210000", "letter": "T" },
  { "cname": "通化", "cid": "220500", "pid": "220000", "letter": "T" },
  { "cname": "唐山", "cid": "130200", "pid": "130000", "letter": "T" },
  { "cname": "天津", "cid": "120100", "pid": "120000", "letter": "T" },
  { "cname": "太原", "cid": "140100", "pid": "140000", "letter": "T" },
  { "cname": "通辽", "cid": "150500", "pid": "150000", "letter": "T" },
  { "cname": "铜陵", "cid": "340700", "pid": "340000", "letter": "T" },
  { "cname": "泰州", "cid": "321200", "pid": "320000", "letter": "T" },
  { "cname": "台州", "cid": "331000", "pid": "330000", "letter": "T" },
  { "cname": "铜仁", "cid": "522200", "pid": "520000", "letter": "T" },
  { "cname": "屯昌", "cid": "461800", "pid": "460000", "letter": "T" },
  { "cname": "天门", "cid": "423300", "pid": "420000", "letter": "T" },
  { "cname": "泰安", "cid": "370900", "pid": "370000", "letter": "T" },
  { "cname": "威海", "cid": "371000", "pid": "370000", "letter": "W" },
  { "cname": "潍坊", "cid": "370700", "pid": "370000", "letter": "W" },
  { "cname": "武汉", "cid": "420100", "pid": "420000", "letter": "W" },
  { "cname": "五指山", "cid": "461100", "pid": "460000", "letter": "W" },
  { "cname": "文昌", "cid": "461400", "pid": "460000", "letter": "W" },
  { "cname": "万宁", "cid": "461500", "pid": "460000", "letter": "W" },
  { "cname": "梧州", "cid": "450400", "pid": "450000", "letter": "W" },
  { "cname": "芜湖", "cid": "340200", "pid": "340000", "letter": "W" },
  { "cname": "温州", "cid": "330300", "pid": "330000", "letter": "W" },
  { "cname": "无锡", "cid": "320200", "pid": "320000", "letter": "W" },
  { "cname": "乌兰察布", "cid": "150900", "pid": "150000", "letter": "W" },
  { "cname": "乌海", "cid": "150300", "pid": "150000", "letter": "W" },
  { "cname": "渭南", "cid": "610500", "pid": "610000", "letter": "W" },
  { "cname": "文山", "cid": "532600", "pid": "530000", "letter": "W" },
  { "cname": "武威", "cid": "620600", "pid": "620000", "letter": "W" },
  { "cname": "乌鲁木齐", "cid": "650100", "pid": "650000", "letter": "W" },
  { "cname": "吴忠", "cid": "640300", "pid": "640000", "letter": "W" },
  { "cname": "五家渠", "cid": "655400", "pid": "650000", "letter": "W" },
  { "cname": "香港", "cid": "810100", "pid": "810000", "letter": "X" },
  { "cname": "西宁", "cid": "630100", "pid": "630000", "letter": "X" },
  { "cname": "西双版纳", "cid": "532800", "pid": "530000", "letter": "X" },
  { "cname": "咸阳", "cid": "610400", "pid": "610000", "letter": "X" },
  { "cname": "西安", "cid": "610100", "pid": "610000", "letter": "X" },
  { "cname": "忻州", "cid": "140900", "pid": "140000", "letter": "X" },
  { "cname": "兴安盟", "cid": "152200", "pid": "150000", "letter": "X" },
  { "cname": "锡林郭勒盟", "cid": "152500", "pid": "150000", "letter": "X" },
  { "cname": "邢台", "cid": "130500", "pid": "130000", "letter": "X" },
  { "cname": "徐州", "cid": "320300", "pid": "320000", "letter": "X" },
  { "cname": "厦门", "cid": "350200", "pid": "350000", "letter": "X" },
  { "cname": "宣城", "cid": "341800", "pid": "340000", "letter": "X" },
  { "cname": "新余", "cid": "360500", "pid": "360000", "letter": "X" },
  { "cname": "西沙群岛", "cid": "462700", "pid": "460000", "letter": "X" },
  { "cname": "襄阳", "cid": "420600", "pid": "420000", "letter": "X" },
  { "cname": "孝感", "cid": "420900", "pid": "420000", "letter": "X" },
  { "cname": "信阳", "cid": "411500", "pid": "410000", "letter": "X" },
  { "cname": "许昌", "cid": "411000", "pid": "410000", "letter": "X" },
  { "cname": "新乡", "cid": "410700", "pid": "410000", "letter": "X" },
  { "cname": "咸宁", "cid": "421200", "pid": "420000", "letter": "X" },
  { "cname": "仙桃", "cid": "423100", "pid": "420000", "letter": "X" },
  { "cname": "湘潭", "cid": "430300", "pid": "430000", "letter": "X" },
  { "cname": "湘西", "cid": "433100", "pid": "430000", "letter": "X" },
  { "cname": "永州", "cid": "431100", "pid": "430000", "letter": "Y" },
  { "cname": "阳江", "cid": "441700", "pid": "440000", "letter": "Y" },
  { "cname": "益阳", "cid": "430900", "pid": "430000", "letter": "Y" },
  { "cname": "岳阳", "cid": "430600", "pid": "430000", "letter": "Y" },
  { "cname": "烟台", "cid": "370600", "pid": "370000", "letter": "Y" },
  { "cname": "宜昌", "cid": "420500", "pid": "420000", "letter": "Y" },
  { "cname": "宜宾", "cid": "511500", "pid": "510000", "letter": "Y" },
  { "cname": "雅安", "cid": "511800", "pid": "510000", "letter": "Y" },
  { "cname": "云浮", "cid": "445300", "pid": "440000", "letter": "Y" },
  { "cname": "玉林", "cid": "450900", "pid": "450000", "letter": "Y" },
  { "cname": "鹰潭", "cid": "360600", "pid": "360000", "letter": "Y" },
  { "cname": "宜春", "cid": "360900", "pid": "360000", "letter": "Y" },
  { "cname": "盐城", "cid": "320900", "pid": "320000", "letter": "Y" },
  { "cname": "扬州", "cid": "321000", "pid": "320000", "letter": "Y" },
  { "cname": "阳泉", "cid": "140300", "pid": "140000", "letter": "Y" },
  { "cname": "运城", "cid": "140800", "pid": "140000", "letter": "Y" },
  { "cname": "伊春", "cid": "230700", "pid": "230000", "letter": "Y" },
  { "cname": "延边", "cid": "222400", "pid": "220000", "letter": "Y" },
  { "cname": "营口", "cid": "210800", "pid": "210000", "letter": "Y" },
  { "cname": "延安", "cid": "610600", "pid": "610000", "letter": "Y" },
  { "cname": "榆林", "cid": "610800", "pid": "610000", "letter": "Y" },
  { "cname": "玉溪", "cid": "530400", "pid": "530000", "letter": "Y" },
  { "cname": "银川", "cid": "640100", "pid": "640000", "letter": "Y" },
  { "cname": "玉树", "cid": "632700", "pid": "630000", "letter": "Y" },
  { "cname": "伊犁", "cid": "654000", "pid": "650000", "letter": "Y" },
  { "cname": "中卫", "cid": "640500", "pid": "640000", "letter": "Z" },
  { "cname": "张掖", "cid": "620700", "pid": "620000", "letter": "Z" },
  { "cname": "昭通", "cid": "530600", "pid": "530000", "letter": "Z" },
  { "cname": "张家口", "cid": "130700", "pid": "130000", "letter": "Z" },
  { "cname": "镇江", "cid": "321100", "pid": "320000", "letter": "Z" },
  { "cname": "舟山", "cid": "330900", "pid": "330000", "letter": "Z" },
  { "cname": "淄博", "cid": "370300", "pid": "370000", "letter": "Z" },
  { "cname": "枣庄", "cid": "370400", "pid": "370000", "letter": "Z" },
  { "cname": "漳州", "cid": "350600", "pid": "350000", "letter": "Z" },
  { "cname": "中山", "cid": "442000", "pid": "440000", "letter": "Z" },
  { "cname": "资阳", "cid": "512000", "pid": "510000", "letter": "Z" },
  { "cname": "遵义", "cid": "520300", "pid": "520000", "letter": "Z" },
  { "cname": "自贡", "cid": "510300", "pid": "510000", "letter": "Z" },
  { "cname": "周口", "cid": "411600", "pid": "410000", "letter": "Z" },
  { "cname": "驻马店", "cid": "411700", "pid": "410000", "letter": "Z" },
  { "cname": "郑州", "cid": "410100", "pid": "410000", "letter": "Z" },
  { "cname": "株洲", "cid": "430200", "pid": "430000", "letter": "Z" },
  { "cname": "张家界", "cid": "430800", "pid": "430000", "letter": "Z" },
  { "cname": "肇庆", "cid": "441200", "pid": "440000", "letter": "Z" },
  { "cname": "湛江", "cid": "440800", "pid": "440000", "letter": "Z" },
  { "cname": "珠海", "cid": "440400", "pid": "440000", "letter": "Z" }
];

let data = {}, group = [];
for (let i = 0; i < citylist.length; i++) {
  var item = citylist[i], key = item.letter;
  if (!data[key]) {
    data[key] = {
      group: key,
      items: []
    };
    group.push(key);
  }
  data[key].items.push(item);
};

export default {
  data: data,
  group: group,
  getCity: function (cid) {
    var obj = { "cname": "北京", "cid": "110100", "pid": "110000", "letter": "B" };
    for (let i = 0; i < citylist.length; i++) {
      var item = citylist[i];
      if (cid == item.cid) {
        obj = item;
        break;
      }
    }
    return obj;
  },
  getCityData: function (id) {
    let arr = []
    for (let i = 0; i < citylist.length; i++) {
      if (id === citylist[i].pid) {
        arr.push(citylist[i])
      }
    }
    return arr
  }
}