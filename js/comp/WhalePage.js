import WhaleImage from "./WhaleImage.js";
import StoryBtn from "./StoryBtn.js";
import Story from "./Story.js";
import { getLocalStorageItem, setLocalStorageItem } from "../util/localStorage.js";
import { LEVEL_SETTING } from "../util/constants.js";
import { getWhaleStatus } from "../util/util.js";

export default class WhalePage {
  constructor() {
    this.name = getLocalStorageItem({ key: "name" });
    this.level = getLocalStorageItem({ key: "level" });
    this.exp = getLocalStorageItem({ key: "exp" });
    this.whaleStatus = getWhaleStatus(this.level);

    this.components = {
      whaleImage: new WhaleImage({
        $target: document.querySelector("#whale-whale"),
        name: this.name,
        level: this.level,
        whaleStatus: this.whaleStatus,
        page: "whale",
      }),
      storyBtn: new StoryBtn({
        name: this.name,
        whaleStatus: this.whaleStatus,
      }),
    };
  }
}
