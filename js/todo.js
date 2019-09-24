window.onload = function () {
    let todoList;

    try {
        todoList = JSON.parse(localStorage["todoList"]);
    } catch (e) {
        todoList = {}
    }

    let str = '<ul class="todo-list">';
    let idx = 0;
    const pageNum = Number(location.href.substr(location.href.lastIndexOf('=') + 1));

    if (todoList.length > 0) {
        todoList.reverse();

        const start = pageNum * 10;
        const end = start + 10;
        let startIdx = 0, endIdx = 0;

        todoList.forEach(value => {
            if (value.finishDate != null || value.isChecked) {
                if (startIdx >= start && endIdx < end) { // 한 페이지에 10개 씩
                    str += '<li class="finish-item">' + value.todo
                        + '<br><span class="period">진행기간 | ' +
                        value.addDate + " ~ ";

                    if (value.finishDate != null)
                        str += value.finishDate + '</span></li>';
                    else
                        str += getDateStr() + '*' + '</span></li>';
                }
                idx++;
                startIdx++;
                endIdx++;
            }
        });

        $('#count').text(idx + "개");
        if (idx === 0)
            $('#no-item-msg').text("완료된 할 일이 이곳에 표시됩니다!");
    } else {
        $('#no-item-msg').text("완료된 할 일이 이곳에 표시됩니다!");
    }

    str += '</ul>';
    $('#finish-list').html(str);

    str = "";
    let totalPage = idx / 10;

    for (let i = 0; i < totalPage; i++) {
        if (i === pageNum)
            str += '<b>' + (i + 1) + '</b> ';
        else
            str += '<a class="page-text" href="../todo.html?index=' + i + '">' + (i + 1) + '</a> ';
    }

    if (idx > 10)
        $('#pages').html(str);
};

function getDateStr() {
    const date = new Date();
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}