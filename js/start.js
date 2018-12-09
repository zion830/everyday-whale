function setName() {
    const name = $('#whale-name').val();
    console.log("이름");
    console.log(name);

    if (name.length === 0) {
        $('#name-msg').text("웨일의 이름을 입력해주세요!");
    }
    else {
        localStorage.setItem("name", name);
        localStorage.setItem("level", 1);
        localStorage.setItem("sumCount", 0);
        history.replaceState({}, "main", "index.html");
        location.reload();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("btn-start").addEventListener("click", setName);
});