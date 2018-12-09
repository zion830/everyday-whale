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
    setWhale(Number(sumCount));
    initList();

    $('.btn-add').click(function () {
        insertData();
    });

    // $("#checkBoxId").change(function(){
    //     if($("#checkBoxId").is(":checked")){
    //         $('.todo-text').css()
    //     }else{
    //         alert("체크박스 체크 해제!");
    //     }
    // });

    $('.btn-finish').click(function () {
        arrayRemove(this.id)
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
        todoList.forEach(value => console.log(value));

        location.reload();
    }
}

function initList() {
    var str = '<ul class="todo-list">';

    try {
        var todoList = JSON.parse(localStorage["todoList"]);
        var id = 0;
        $('#list-msg').text('');
        var start = '<li id="todo-';
        var start2 = '\"><label class="container"><span class="todo-text">';
        var checkEnd = '</span><input type="checkbox"><span class="checkmark"></span></label><input type="button" class="btn-finish"></li>';
        var unCheckedEnd = '</span><input type="checkbox"><span class="checkmark"></span></label><input type="button" class="btn-finish" id="';
        var unCheckedEnd2 = '"></li>';

        todoList.forEach(value => {
            str += start + id + start2 + value.todo + unCheckedEnd + id + unCheckedEnd2;
            id++;
        });
    } catch (e) {
        $('#list-msg').text('아직 할 일이 없습니다!');
    }

    str += '<li>\n' +
        '        <input type="text" placeholder="새로운 할 일" id="new-to-do">\n' +
        '        <input type="button" id="add-to-do" class="btn-add">\n' +
        '    </li></ul>';

    $('#todo-list').html(str)
}

function arrayRemove(value) {
    alert(value);
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

function setWhale() {
    var level = localStorage.getItem("level");
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