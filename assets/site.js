// 언어 전환 (English / 한국어 / 日本語). 기본은 영어, 선택은 이 브라우저에만 저장
(function () {
  var LANGS = ["en", "ko", "ja"];
  var KEY = "pictorialer-lang";

  function read() {
    try {
      var q = new URLSearchParams(location.search).get("lang");
      if (LANGS.indexOf(q) >= 0) return q;
      var s = localStorage.getItem(KEY);
      if (LANGS.indexOf(s) >= 0) return s;
    } catch (e) {}
    return "en";
  }

  function apply(lang) {
    var html = document.documentElement;
    html.setAttribute("data-lang", lang);
    html.setAttribute("lang", lang);
    var buttons = document.querySelectorAll(".lang button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute(
        "aria-pressed",
        String(buttons[i].getAttribute("data-set") === lang)
      );
    }
  }

  // <head>에서 바로 실행: 글자가 깜빡이지 않게 먼저 언어를 정하고, 버튼은 화면이 준비되면 표시
  var current = read();
  apply(current);
  document.addEventListener("DOMContentLoaded", function () {
    apply(current);
  });

  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest(".lang button");
    if (!b) return;
    var lang = b.getAttribute("data-set");
    current = lang;
    apply(lang);
    try {
      localStorage.setItem(KEY, lang);
    } catch (err) {}
  });
})();
