import { removeLocalStorageItem } from "./util/localStorage.js";

function clearData() {
  const clearConfirm = confirm("정말 초기화 하시겠습니까?\n모든 데이터가 영구적으로 삭제됩니다.");

  if (clearConfirm) {
    removeLocalStorageItem({ keys: ["name", "level", "todoList", "exp", "sumCount"] });

    history.replaceState({}, "main", "start.html");
    location.reload();
  }
}

document.querySelector(".btn-clear").addEventListener("click", clearData);
