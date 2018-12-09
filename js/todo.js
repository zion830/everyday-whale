window.onload = function () {
    var count = localStorage.getItem("sumCount");
    $('#count').text(count + "개");

    var str = '<ul class="todo-list">';
    if (count > 0) {
        var todoList = JSON.parse(localStorage["todoList"]);
        todoList.forEach(value => {
            console.log(value);
            if (value.finishDate != null) {
                str += ("<li>" + value.todo + "</li>");
            }
        })
    } else {
        $('#finish-msg').text("완료된 할 일이 이곳에 표시됩니다!");
    }
    str += '</ul>';
    $('#finish-list').html(str);
};