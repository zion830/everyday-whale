$(function () {
    // 이름이 없을 경우 시작 페이지로
    if (localStorage.getItem("name") === null) {
        history.replaceState({}, "start", "start.html");
        location.reload();
    }

    const name = localStorage.getItem("name");
    const level = localStorage.getItem("level");
    const status = getStatus(level);

    $('.whale-info').text('Lv.' + level + ' ' + name);
    $('.whale-info2').text('Lv.' + level + " " + name);
    setLevel();
    setWhale(status);
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
            removeItem(this.id);
    });

    $("#new-to-do").keypress(function (e) {
        if (e.which == 13) {
            insertData();
        }
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
        var todoList;
        try {
            todoList = JSON.parse(localStorage["todoList"]);
        } catch (e) {
            todoList = new Array();
        }

        var newItem = new Todo(todoList.length, todo, false, getDateStr(), null);
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
        var checkEnd = '<input type="checkbox" checked="checked"><span class="checkmark"></span></label>' +
            '<input type="button" class="btn-finish" id="';
        var unCheckedEnd = '</span><input type="checkbox"><span class="checkmark"></span></label>' +
            '<input type="button" class="btn-finish" id="';
        var end = '"></li>';

        todoList.forEach(value => {
            if (value.isChecked && value.finishDate === null) {
                str += start + id + start2 + value.todo + checkEnd + id + end;
            }
            else if (!value.isChecked && value.finishDate === null) {
                str += start + id + start2 + value.todo + unCheckedEnd + id + end;
            }
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

    arr[value].finishDate = getDateStr();
    localStorage.setItem("todoList", JSON.stringify(arr));
    localStorage.setItem("sumCount", Number(localStorage.getItem("sumCount")) + 1);

    setLevel();
    location.reload();
}

function removeItem(value) {
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

function setWhale(status) {
    switch (status) {
        case 1:
            $('#whale-main').attr("src", "/img/whale1.gif");
            $('#whale-whalepage').attr("src", "/img/whale1.gif");
            break;
        case 2:
            $('#whale-main').attr("src", "/img/whale2.gif");
            $('#whale-whalepage').attr("src", "/img/whale2.gif");
            break;
        case 3:
            $('#whale-main').attr("src", "/img/whale3.gif");
            $('#whale-whalepage').attr("src", "/img/whale3.gif");
            break;
        case 4:
            $('#whale-main').attr("src", "/img/whale4.gif");
            $('#whale-whalepage').attr("src", "/img/whale4.gif");
            break;
        case 5:
            $('#whale-main').attr("src", "/img/whale5.gif");
            $('#whale-whalepage').attr("src", "/img/whale5.gif");
            break;

    }
}

function getStatus(level) {
    if (level < 4) {
        return 1;
    } else if (level < 9) {
        return 2;
    } else if (level < 16) {
        return 3;
    } else if (level < 27) {
        return 4;
    } else {
        return 5;
    }
}

function setLevel() {
    var count = localStorage.getItem("sumCount");
    var exp, level;
    if (count < 9) {
        exp = ((count % 3) / 3 * 100).toFixed(1) + "%";
        level = Math.floor(count / 3 + 1)
    } else if (count < 34) {
        exp = (((count - 9) % 5) / 5 * 100).toFixed(1) + "%";
        level = 4 + Math.floor((count - 9) / 5);
    } else if (count < 52) {
        exp = (((count - 34) % 6) / 6 * 100).toFixed(1) + "%";
        level = 9 + Math.floor((count - 34) / 6)
    } else if (count < 108) {
        exp = (((count - 52) % 7) / 7 * 100).toFixed(1) + "%";
        level = 12 + Math.floor((count - 52) / 7)
    } else if (count < 154) {
        exp = (((count - 108) % 8) / 8 * 100).toFixed(1) + "%";
        level = 20 + Math.floor((count - 108) / 8)
    } else {
        exp = ((count - 162) / 10 * 100).toFixed(1) + "%";
        level = 27 + Math.floor((count - 162) / 10);
    }

    $('.cssProgress-label').text(exp);
    $('.cssProgress-bar').css("width", exp);

    localStorage.setItem("level", level);
    localStorage.setItem("exp", exp);
}

function getDateStr() {
    var date = new Date();
    var dateStr = date.getFullYear() + '-'
        + (date.getMonth() + 1) + '-' + date.getDate();

    return dateStr;
}