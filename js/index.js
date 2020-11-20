import { getLocalStorageItem } from "./util/localStorage.js";
import MainPage from "./comp/MainPage.js";

(function () {
  if (getLocalStorageItem({ key: "name", defalutValue: "" }) === "") {
    history.replaceState({}, "start", "start.html");
    location.reload();
  } else {
    new MainPage();
  }
})();
