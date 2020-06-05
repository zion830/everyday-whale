// 초기화하기
function clearData() {
    const clearConfirm = confirm("정말 초기화 하시겠습니까?\n모든 데이터가 영구적으로 삭제됩니다.")

    if (clearConfirm) {
        localStorage.removeItem("name")
        localStorage.removeItem("level")
        localStorage.removeItem("sumCount")
        localStorage.removeItem("todoList")
        localStorage.removeItem("tabStatus")

        history.replaceState({}, "main", "start.html")
        location.reload()
    }
}

document.querySelector('.btn-clear').addEventListener('click', clearData)
