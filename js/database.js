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
    $('.whale-info2').text("Lv." + level + " " + name);

    $('#storytitle').text(name + "의 성장이야기");

    try {
        var todoList = JSON.parse(localStorage["todoList"]);
        $('#list-msg').text('');
        todoList.each(function () {
            var route = "<li><label class=\"container\"><span class=\"todo-text\">" + this.text +
                "</span><input type=\"checkbox\"><span class=\"checkmark\"></span></label>" +
                "<input type=\"button\" class=\"btn-finish\"></li>";
            $('#todo-list').append(route);
        });
    } catch (e) {
        $('#list-msg').text('아직 할 일이 없습니다!');
    }

    $('#add-to-do').click(function () {
        insertData();
    });
});

class Todo {
    constructor(todo, isChecked, addDate, finishDate) {
        this.todo = todo;
        this.isChecked = isChecked;
        this.addDate = addDate;
        this.finishDate = finishDate;
    }
}

function insertData() {
    var todo = $('#new-to-do').val();
    console.log(todo);
    if (todo === "")
        alert('할 일을 입력해주세요' + '!');
    else {
        var date = new Date().getDate();
        var todoList;
        try {
            todoList = JSON.parse(localStorage["todoList"]);
        } catch (e) {
            todoList = new Array();
        }

        var newItem = new Todo(todo, false, date, null);
        todoList.push(newItem);
        todoList.forEach(value => console.log(value));
    }
}

function deleteData() {

}
