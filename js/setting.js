function clearData() {
    var clearConfirm = confirm("정말 초기화 하시겠습니까?\n모든 데이터가 영구적으로 삭제됩니다.");

    if (clearConfirm) {
        localStorage.removeItem("name");
        localStorage.removeItem("level");
        localStorage.removeItem("sumCount");
        localStorage.removeItem("todoList");

        history.replaceState({}, "main", "start.html");
        location.reload();
    }
}

const toggleSwitch = $('#ckbx-style-8-1');

function toggleOnClicked() {
    toggleSwitch.val(toggleSwitch.val() != 0 ? 0 : 1);
    localStorage.setItem("tab_status", toggleSwitch.val());
}

$(function () {
    $('.btn-clear').click(function () {
        clearData();
    });

    toggleSwitch.click(function () {
        toggleOnClicked();
    })
});