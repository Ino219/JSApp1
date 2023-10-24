// コードをここに挿入。
process.stdin.resume();
process.stdin.setEncoding('utf8');
// Your code here!
var s = "0(11)";
//()内の文字列を取得
var after = s.match(/\((.+)\)/)[1];

var sample = "        ALL     2       2           2";
//var sample2="         ALL  3    3       3";
var sample2 = "         ALL           ";
var sample3 = "   DMON    : CHIP0(2),CHIP0(8);"
var sample4 = "   DMON    : CHIP0(4),CHIP0(6)"
var sample5 = "    CHIP0(5),CHIP0(3);"


var split = sample.split("    ");
var split2 = sample2.split(" ");
//論理ネットの読み込み
//端子情報
var tns = [];
var testStr = String(sample4);
var testStr_1 = String(sample5);

var test = [];

//終端記号があるかどうか判定
var ans = testStr.indexOf(";");
if (ans != -1) {
    //もし、終端記号があれば、終端記号を削除
    testStr = testStr.replace(";", "");
} else {
    //終端記号がなければ、次行にデータが続くと考える
    //終端記号の削除
    testStr_1 = testStr_1.replace(";", "");
    //CHIP0(5)などの形式でデータ取得
    var split_Str = testStr_1.trim().split(",");
    for (var j = 0; j < split_Str.length; j++) {


        //()内の値を抽出
        var after = split_Str[j].match(/\((.+)\)/)[1];
        test.push(after);
    }
    console.log(test);
}
//ネット名と端子情報に分割
var split3 = testStr.split(":");
//前後の余白をなくしたネット名
var split3_NetName = split3[0].trim();
//ネット名を端子情報配列に格納
tns.push(split3_NetName);
//端子情報部を抽出し、配列化
var split3_1 = split3[1].trim().split(",");
//配列化した端子情報を反復処理して、()内の値を抜き出す
for (var i = 0; i < split3_1.length; i++) {
    //値の文字列化
    var tmpStr = String(split3_1[i]);
    //()内の値を抽出
    var after = tmpStr.match(/\((.+)\)/)[1];
    //各番号を端子情報配列に格納
    tns.push(after);
}

//console.log(tns);

var list = [];
var list2 = []
//空白文字とALLを飛ばして、配列の作成
for (var i = 0; i < split.length; i++) {
    if (split[i] == "" || split[i].trim() == "ALL") {
        continue;
    } else {
        //["2","2","2"]
        list.push(split[i].trim());
    }
}
for (var i = 0; i < split2.length; i++) {
    if (split2[i] == "" || split2[i].trim() == "ALL") {
        continue;
    } else {
        //["3","4","3"]
        list2.push(split2[i].trim());
    }
}
//あらゆる空白を除去(ALL343)
var withoutSpace = sample2.replace(/[\s\u{3000}]/ug, '');
//配列内に同値のみの場合はfalseで返す
var key = 0;
var check = false;
if (list2.length != 0) {
    for (var i = 0; i < list2.length; i++) {
        if (i == 0) {
            key = list2[i];
        } else {
            if (key != list2[i]) {
                check = true;
            }
        }
    }
} else {
    //console.log("長さが1");
}
