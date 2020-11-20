import { NUM_OF_WHALE } from "../util/constants.js";

export default class StoryBtn {
  constructor({ name, whaleStatus }) {
    this.name = name;
    this.whaleStatus = whaleStatus;
    this.$target = document.querySelector("#story-title-container");

    this.render();
  }

  makeStoryBrnHTMLString(num) {
    const isLock = num > this.whaleStatus ? true : false;

    return `
      <button class="story-btn" data-story-btn-id="story-btn-${num}">
        <img 
          src="${isLock ? `img/whale${num}_50px_grey.png` : `img/whale${num}_50px.png`}" 
          alt="${num}번째 스토리 버튼" 
        />
      </button>
    `;
  }

  render() {
    const storyBtnTitle = `
      <div class="story-btn-box">
        <div>
          <img src="img/heart.png" class="heart">
          <h3 class="story-title">${this.name}의 이야기</h3>
          <img src="img/heart.png" class="heart">
        </div>
        <p class="story-subtitle">고래의 성장단계에 따른 스토리가 표시됩니다.<br />버튼을 클릭해보세요!</p>
      </div>
    `;
    this.$target.insertAdjacentHTML("beforeend", storyBtnTitle);

    const storyBtnHTMLStringArray = [];

    for (let i = 0; i < NUM_OF_WHALE; i++) {
      storyBtnHTMLStringArray.push(this.makeStoryBrnHTMLString(i + 1));
    }

    this.$target.insertAdjacentHTML("beforeend", `<div class="story-btn-box">${storyBtnHTMLStringArray.join("")}</div>`);
  }
}
