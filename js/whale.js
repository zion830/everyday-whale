import WhalePage from "./comp/WhalePage.js";

new WhalePage();

/*
class Whale {
  constructor() {
    this.name = localStorage.getItem("name");
    this.level = localStorage.getItem("level");
    this.exp = localStorage.getItem("exp") === null ? 0 : localStorage.getItem("exp");

    this.changeNameEventHandler();
    this.renderWhaleInfo();
    this.renderProgressBar();
  }

  renderWhaleInfo() {
    const target = document.querySelector("#lv-name");
    target.innerHTML = `Lv.${this.level} ${this.name}`;
  }

  renderProgressBar() {
    const progressLabel = document.querySelectorAll(".cssProgress-label");
    const progressBar = document.querySelectorAll(".cssProgress-bar");

    if (this.exp === -1) {
      progressLabel[0].insertAdjacentText("beforeend", "정보를 불러올 수 없습니다");
      return false;
    }

    progressLabel[0].insertAdjacentText("beforeend", `${this.exp}%`);
    progressBar[0].style.width = `${this.exp}%`;
  }

  changeNameEventHandler() {
    const changeNameButton = document.querySelector("#btn-change-name");

    changeNameButton.addEventListener("click", (event) => {
      const newName = prompt("새로운 이름을 지어주세요!", name);

      if (newName !== null && this.changeName(newName)) {
        this.name = newName;
        this.renderWhaleInfo();
      }
    });
  }

  changeName(newName) {
    if (newName.length === 0) {
      alert("1자 이상의 이름을 지어주세요.\n이름 없는 고래가 되면 슬프잖아요.");
      return false;
    } else {
      localStorage.setItem("name", newName);
      return true;
    }
  }
}
*/
