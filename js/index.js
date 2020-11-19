import Main from "./comp/Main.js";

document.addEventListener("DOMContentLoaded", (event) => {
  if (isExistName()) {
    new Main();
    document.querySelector("#input-todo").focus();
  } else {
    history.replaceState({}, "start", "start.html");
    location.reload();
  }
});

function isExistName() {
  return localStorage.getItem("name") !== null;
}
