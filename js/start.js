$(function () {
    function setName() {
        const name = $('#whale-name').val();
        if (name.length === 0) {
            $('#name-msg').text("웨일의 이름을 입력해주세요!");
        }
        else {
            localStorage.setItem("name", name);
            history.replaceState({}, "main", "index.html");
            location.reload();
        }
    }
});