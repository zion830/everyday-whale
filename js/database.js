$(function () {
    var db = openDatabase("whale_db", "1.0", "whale data", 5 * 1024 * 1024);

    // 이름이 없을 경우 시작 페이지로
    if (localStorage.getItem("name") === null) {
        history.replaceState({}, "start", "start.html");
        location.reload();
    }

    var name = localStorage.getItem("name");
    $('.whale-info').text("Lv.1 " + name);
});