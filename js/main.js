import App from "./comp/App.js";

document.addEventListener("DOMContentLoaded", (event) => {
  if (isExistName()) {
    new App();
    document.querySelector("#input-todo").focus();
  } else {
    history.replaceState({}, "start", "start.html");
    location.reload();
  }
});

function isExistName() {
  return localStorage.getItem("name") !== null;
}
