$(function () {
    // 이름이 없을 경우 시작 페이지로
    if (localStorage.getItem("name") === null) {
        history.replaceState({}, "start", "start.html");
        location.reload();
    }

    var name = localStorage.getItem("name");
    var level = localStorage.getItem("level");

    $('.whale-info').text("Lv." + level + " " + name);
    setWhale(level);
    initList();

    $('.btn-add').click(function () {
        insertData();
    });

    var check = true;
    $(".container").click(function () {
        var id = Number(this.id.substring(5, this.id.length));
        if (check) {
            var todoList = JSON.parse(localStorage["todoList"]);
            todoList[id].isChecked = !todoList[id].isChecked;
            localStorage.setItem("todoList", JSON.stringify(todoList));
        }
        check = !check;
    });

    $('.btn-finish').click(function () {
        var todoList = JSON.parse(localStorage["todoList"]);
        if (todoList[this.id].isChecked)
            finish(this.id);
        else
            arrayRemove(this.id);
    });
});

class Todo {
    constructor(id, todo, isChecked, addDate, finishDate) {
        this.id = id;
        this.todo = todo;
        this.isChecked = isChecked;
        this.addDate = addDate;
        this.finishDate = finishDate;
    }
}

function insertData() {
    var todo = $('#new-to-do').val();
    if (todo === "")
        alert('할 일을 입력해주세요' + '!');
    else {
        var date = new Date();
        var dateStr = date.getFullYear() + '-'
            + date.getMonth() + '-' + date.getDate();

        var todoList;
        try {
            todoList = JSON.parse(localStorage["todoList"]);
        } catch (e) {
            todoList = new Array();
        }

        var newItem = new Todo(todoList.length, todo, false, dateStr, null);
        todoList.push(newItem);
        localStorage.setItem("todoList", JSON.stringify(todoList));
        location.reload();
    }
}

function initList() {
    var str = '<ul class="todo-list">';

    try {
        var todoList = JSON.parse(localStorage["todoList"]);
        var id = 0;
        $('#list-msg').text('');
        var start = '<li><label class="container" id="todo-';
        var start2 = '">';
        var checkEnd = '<input type="checkbox" checked="checked"><span class="checkmark"></span></label><input type="button" class="btn-finish" id="';
        var unCheckedEnd = '</span><input type="checkbox"><span class="checkmark"></span></label><input type="button" class="btn-finish" id="';
        var end = '"></li>';

        todoList.forEach(value => {
            if (value.isChecked && value.finishDate === null)
                str += start + id + start2 + value.todo + checkEnd + id + end;
            else if (!value.isChecked && value.finishDate === null)
                str += start + id + start2 + value.todo + unCheckedEnd + id + end;

            id++;
        });
    } catch (e) {
        $('#list-msg').text('첫 번째 할 일을 추가해보세요!');
    }

    str += '<li>\n' +
        '        <input type="text" placeholder="새로운 할 일" id="new-to-do">\n' +
        '        <input type="button" id="add-to-do" class="btn-add">\n' +
        '    </li></ul>';

    $('#todo-list').html(str)
}

function finish(value) {
    var arr = JSON.parse(localStorage["todoList"]);

    var date = new Date();
    var dateStr = date.getFullYear() + '-'
        + date.getMonth() + '-' + date.getDate();

    arr[value].finishDate = dateStr;
    localStorage.setItem("todoList", JSON.stringify(arr));
    localStorage.setItem("sumCount", Number(localStorage.getItem("sumCount")) + 1);

    setLevel();
    location.reload();
}

function arrayRemove(value) {
    var arr = JSON.parse(localStorage["todoList"]);
    arr.splice(value, 1);

    var id = 0;
    arr.forEach(value => {
        value.id = id;
        id++;
    });

    localStorage.setItem("todoList", JSON.stringify(arr));
    location.reload();
}

function setWhale(level) {
    if (level < 3) {
        $('#whale-main').attr("src", "/img/whale1.gif");
    } else if (level < 9) {
        $('#whale-main').attr("src", "/img/whale2.gif");
    } else if (level < 16) {
        $('#whale-main').attr("src", "/img/whale3.gif");
    } else if (level < 27) {
        $('#whale-main').attr("src", "/img/whale4.gif");
    } else {
        $('#whale-main').attr("src", "/img/whale5.gif");
    }
}

function setLevel() {
    var count = localStorage.getItem("sumCount");
    var level;
    if (count < 3) {
        level = 1;
    } else if (count < 6) {
        level = 2;
    } else if (count < 9) {
        level = 3;
    } else if (count < 14) {
        level = 4;
    } else if (count < 19) {
        level = 5;
    } else if (count < 24) {
        level = 6;
    } else if (count < 29) {
        level = 7;
    } else if (count < 34) {
        level = 8;
    } else if (count < 40) {
        level = 9;
    } else if (count < 46) {
        level = 10;
    } else if (count < 52) {
        level = 11;
    } else if (count < 59) {
        level = 12;
    } else if (count < 66) {
        level = 13;
    } else if (count < 73) {
        level = 14;
    } else if (count < 80) {
        level = 15;
    } else if (count < 87) {
        level = 16;
    } else if (count < 94) {
        level = 17;
    } else if (count < 101) {
        level = 18;
    } else if (count < 108) {
        level = 19;
    } else if (count < 115) {
        level = 20;
    } else if (count < 122) {
        level = 21;
    } else if (count < 130) {
        level = 22;
    } else if (count < 138) {
        level = 23;
    } else if (count < 146) {
        level = 24;
    } else if (count < 154) {
        level = 25;
    } else if (count < 162) {
        level = 26;
    } else {
        level = 27 + (count - 162) / 10
    }

    localStorage.setItem("level", level);
}