const CURRENT_LEVEL = localStorage.getItem("level");
const NO_WHALE = 5;
const LEVEL_SETTING = [0, 3, 8, 15, 26, Infinity];

document.addEventListener("DOMContentLoaded", function () {
  renderStoryTitle();
  const isLock = checkStoryLock();
  renderButton(isLock);
  addStoryButtonEvent();
});

function renderStoryTitle() {
  const NAME_OF_WHALE = localStorage.getItem("name");
  const target = document.querySelector("#story-title");

  target.insertAdjacentHTML("beforeend", `${NAME_OF_WHALE}의 이야기`);
}

function checkStoryLock() {
  const origin = new Array(NO_WHALE).fill(true);
  const result = origin.map((v, i) => (CURRENT_LEVEL > LEVEL_SETTING[i] ? false : true));

  return result;
}

function renderButton(isLock) {
  const target = document.querySelector("#story-btn-container");
  let buttons = "";

  for (let i = 1; i <= NO_WHALE; i++) {
    const btnImgSrc = isLock[i - 1] ? `img/whale${i}_50px_grey.png` : `img/whale${i}_50px.png`;

    buttons += `
      <button class="story-btn" id="story-btn-${i}">
        <img src="${btnImgSrc}" alt="${i}번째 스토리 버튼 이미지" id="story-btn-img-${i}">
      </button>
    `;
  }

  target.insertAdjacentHTML("beforeend", buttons);
}

function addStoryButtonEvent() {
  const storyButtonContainer = document.querySelector("#story-btn-container");

  storyButtonContainer.addEventListener("click", (event) => {
    const target = event.target;

    if (target.tagName === "IMG" || target.tagName === "BUTTON") {
      const selectedButtonIndex = target.id.charAt(target.id.length - 1);
      const storyContainer = document.querySelector("#story-container");
      const story = getStory(selectedButtonIndex);

      storyContainer.innerHTML = story;
    }
  });
}

function getStory(buttonIndex) {
  let story = ``;

  if (CURRENT_LEVEL <= LEVEL_SETTING[buttonIndex - 1]) {
    story = `
      <p class="not-open">
        <img src="/img/ic_locked.png" class="story-lock"><br>
        ${buttonIndex}단계 성장 시 열리는 스토리입니다<br>
        목표를 이루고 웨일을 성장시켜 보세요!
      </p>
    `;
  } else {
    for (let i = LEVEL_SETTING[buttonIndex - 1]; i < CURRENT_LEVEL && i < LEVEL_SETTING[buttonIndex]; i++) {
      story += `
        <p class="story-content">
          <b>#${i + 1}번째 이야기</b><br>
          ${STORY[i]}
        </p>
      `;
    }
  }

  return story;
}
