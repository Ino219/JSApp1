// コードをここに挿入。
process.stdin.resume();
process.stdin.setEncoding('utf8');
// Your code here!
var s = "0(11)";
//()内の文字列を取得
var after = s.match(/\((.+)\)/)[1];

//サンプル文字列の定義
var sample = "        ALL     2       2           2";
//var sample2="         ALL  3    3       3";
var sample2 = "         ALL           ";
var sample3 = "   DMON    : CHIP0(1),Ball0(2);"
var sample4 = "   DMON    : CHIP0(3),CHIP0(4)"
var sample5 = "    CHIP0(5),CHIP0(6);"
var sample6 = "   DMON    : CHIP0(7),Ball0(8);"
var sample7 = "   DMON    : CHIP0(9),CHIP0(10)"
var sample8 = "    CHIP0(11),CHIP0(12);"
var start = "start";
var end = "end";



var testList = [];
testList.push(sample);
testList.push(sample2);
testList.push(start);
testList.push(sample3);
testList.push(sample4);
testList.push(sample5);
testList.push(sample6);
testList.push(sample7);
testList.push(sample8);
testList.push(end);

//処理継続フラグの定義
var cFlg = false;
//各配列定義
//ネット名と端子情報の配列
var tList = [];
//tListの配列
var totalList = [];

var netnameList = [];
var NoList = [];
//スタート位置の初期化
var startFlg = false;
//反復処理開始
for (var i = 0; i < testList.length; i++) {

    var tmpData = String(testList[i]);
    //スタートからエンドの範囲を指定し、間の文字列を表示
    if (tmpData == "start") {
        console.log("start");
        //Startの通過でフラグが立つ
        startFlg = true;
        //endの通過でフラグが初期化
    } else if (tmpData == "end") {
        console.log("end");
        startFlg = false;
    }
    //startのフラグが立ち、かつstart文字列ではない場合に取得
    if (startFlg && testList[i] != "start") {
        console.log(testList[i]);
    }
    //:が含まれておらず、;も含まれていない文字列の場合はスルー
    if ((testList[i].indexOf(":") == -1) && (testList[i].indexOf(";") == -1)) {
        continue;
    } else if ((testList[i].indexOf(":") != -1)) {
        //:が含まれる場合、項目行とする
        //同じ行に終端記号があれば、処理継続フラグを初期化
        if ((testList[i].indexOf(";") != -1)) {
            //終端記号を含む場合は終端記号を除く
            testList[i] = testList[i].replace(";", "");
            cFlg = false;
        } else {
            //終端記号が文字列に含まれていない場合、処理継続フラグを立てる
            cFlg = true;
        }
        //取得処理
        //:で分割処理をする/DMONとCHIP(0)
        var test_split = testList[i].split(":");
        //1番目の値から前後の余白をなくしたネット名を取得
        var split3_NetName = test_split[0].trim();
        //ネット名を端子情報配列に格納
        tList.push(split3_NetName);
        //2番目の値から端子情報部をカンマ区切りで抽出し、配列化
        var split3_1 = test_split[1].trim().split(",");
        //配列化した端子情報を反復処理して、()内の値を抜き出す
        for (var j = 0; j < split3_1.length; j++) {
            //値の文字列化
            var tmpStr = String(split3_1[j]);
            //値の中からCHIPという文字列が含まれているものを取得
            if ((tmpStr.indexOf("CHIP") != -1)) {
                //()内の値を抽出
                var after = tmpStr.match(/\((.+)\)/)[1];
                //各番号を端子情報配列に格納
                tList.push(after);
            }
        }
        //項目行に続く改行列でかつ、処理継続フラグがたっている場合 
    } else if (cFlg) {
        //同じ行に終端記号があれば、フラグを初期化
        if ((testList[i].indexOf(";") != -1)) {
            testList[i] = testList[i].replace(";", "");
            cFlg = false;
        } else {
            //終端記号が含まれていない場合は処理継続フラグを立てる
            cFlg = true;
        }
        //取得処理
        //端子情報部を抽出し、配列化
        var splitc_1 = testList[i].trim().split(",");
        //配列化した端子情報を反復処理して、()内の値を抜き出す
        for (var n = 0; n < splitc_1.length; n++) {
            //値の中からCHIPという文字列が含まれているものを取得
            if ((tmpStr.indexOf("CHIP") != -1)) {
                //値の文字列化
                var tmpStr_c = String(splitc_1[n]);
                //()内の値を抽出
                var after_c = tmpStr_c.match(/\((.+)\)/)[1];
                //各番号を端子情報配列に格納
                tList.push(after_c);
            }
        }
    }

    //処理継続フラグが立ってない場合、リストに追加し、tListの初期化
    if ((tList != "") && cFlg == false) {
        //ネット名と端子情報をリストに追加
        totalList.push(tList);
        tList = [];
    }

}
//ネット名と端子情報のリストを反復処理
for (var y = 0; y < totalList.length; y++) {
    var temp = [];
    var str = "";
    //ネット名と端子情報を取得
    temp = totalList[y];
    //ネット名リストに1番目のデータを格納
    netnameList.push(temp[0]);
    //ネット名と端子情報の数に応じて、反復処理/DMON:CHIP(1),CHIP(2),Ball(5)
    for (var x = 1; x < temp.length; x++) {
        //最終データの場合はカンマをつけない
        if (x == (temp.length - 1)) {
            str += temp[x];
            //それ以外の場合はカンマをつけて保存
        } else {
            str += temp[x] + ",";
        }
    }
    NoList.push(str);
}

console.log(totalList);
console.log(netnameList);
//出力:[ 'DMON', 'DMON', 'DMON', 'DMON' ]
console.log(NoList);
//出力:[ '1', '3,4,5,6', '7', '9,10,11,12' ]


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
    //testStr_1=testStr_1.replace(";","");
    //CHIP0(5)などの形式でデータ取得
    var split_Str = testStr_1.trim().split(",");
    //取得したデータ数に応じて反復処理
    for (var j = 0; j < split_Str.length; j++) {
        //()内の値を抽出
        var after = split_Str[j].match(/\((.+)\)/)[1];
        test.push(after);
    }
    //console.log(test);
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
