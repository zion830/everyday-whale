$(function () {
    // 이름이 없을 경우 시작 페이지로
    if (localStorage.getItem("name") === null) {
        history.replaceState({}, "start", "start.html");
        location.reload();
    }

    var name = localStorage.getItem("name");
    var level = localStorage.getItem("level");
    var sumCount = localStorage.getItem("sumCount");
    $('.whale-info').text("Lv." + level + " " + name);
});

function createTable() {
    var db = openDatabase("whale_db", "1.0", "whale data", 5 * 1024 * 1024);
    db.transaction(function (execute) {
        var createQuery;
        createQuery = "CREATE TABLE IF NOT EXISTS todo(" +
            "id INTEGER PRIMARY KEY AUTO_INCREMENT," +
            "todo TEXT," +
            "idChecked BOOLEAN," +
            "addDate DATE" +
            ")";
        execute.executeSql(createQuery);
    });
}

function insertData() {
    var db = openDatabase("whale_db", "1.0", "whale data", 5 * 1024 * 1024);
    db.transaction(function (execute) {
        var insertQuery = "INSERT INTO todo(test) VALUES(?)";
        execute.executeSql(insertQuery, [$("#add-to-do").val()], function (transaction, resultSet) {
            console.log("할일 추가 성공");
        }, function () {
            console.log("할일 추가 실패")
        });
    });
}

function deleteData() {
    var db = openDatabase("whale_db", "1.0", "whale data", 5 * 1024 * 1024);
    db.transaction(function (execute) {
        var deleteQuery = "DELETE FROM todo WHERE id = ?";
        execute.executeSql(deleteQuery, [id], function (transaction, resultSet) {
            console.log("할일 삭제 성공")
        }, function () {
            console.log("할일 삭제 실패")
        });
    });
}