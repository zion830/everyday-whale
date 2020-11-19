import { getLocalStorageItem } from "./util/localStorage.js";
import Main from "./comp/Main.js";

document.addEventListener("DOMContentLoaded", (event) => {
  if (getLocalStorageItem({ key: "name", defalutValue: "" }) !== "") {
    new Main();
  } else {
    history.replaceState({}, "start", "start.html");
    location.reload();
  }
});
