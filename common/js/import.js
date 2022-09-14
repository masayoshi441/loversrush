/*
 *  import.js
 *  Copyright (c) 2012 AOK (http://aokura.com/)
 *
 *  2012.4.19　第2版
 *
 */

// スクリプトの位置を取得
var get_js_path = function (fn) {
  var a = document.getElementsByTagName("script");
  var s = a[a.length - 1].src;
  if (s.indexOf("?") > 0) {
    s = s.substring(0, s.indexOf("?"));
  }
  if (fn && /\.js$/i.test(fn)) {
    var e = fn.replace(/[\+\.\(\)\[\]\^\$]/g, function ($0) {
      return "\\" + $0;
    });
    var r = new RegExp(e + "$");
    for (var i = 0; i < a.length; i++) {
      s = a[i].src;
      if (s.indexOf("?") > 0) {
        s = s.substring(0, s.indexOf("?"));
      }
      if (r.test(s)) break;
    }
  }
  return s.substring(0, s.lastIndexOf("/") + 1);
};

// 絶対パスを取得
var normalize_url = function (path) {
  var a = document.createElement("a");
  a.href = path;
  return a.href;
};

// スクリプトの読み込み
var require = function (url, charset, nocache) {
  document.write('<script type="text/javascript" src="');
  if (!/^https?:\/\//i.test(url)) {
    url = normalize_url(get_js_path("import.js") + url);
  }
  if (nocache) url += "?" + new Date().getTime();
  document.write(url);
  if (charset) document.write('" charset="' + charset);
  document.write('"></script>');
};

// インポート
(function () {
  require("js_lib.js");
})();
