import { getLocalStorageItem } from "./util/localStorage.js";
import Main from "./comp/Main.js";

(function () {
  if (getLocalStorageItem({ key: "name", defalutValue: "" }) === "") {
    history.replaceState({}, "start", "start.html");
    location.reload();
  } else {
    new Main();
  }
})();
