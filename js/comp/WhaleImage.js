import { getWhaleStatus } from "../util/util.js";

export default class WhaleImage {
  constructor({ $target, name, level, whaleStatus, page }) {
    this.state = {
      name: name,
      level: level,
      whaleStatus: whaleStatus,
      page: page,
    };

    this.$target = $target;

    this.render();
  }

  setState({ nextName, nextLevel, nextWhaleStatus }) {
    if (nextName) this.state.name = nextName;
    if (nextLevel) this.state.level = nextLevel;
    if (nextWhaleStatus) this.state.whaleStatus = nextWhaleStatus;

    this.render();
  }

  render() {
    this.$target.innerHTML = `
      <img 
        class="${this.state.page}-whale-img swing" 
        src="./img/whale${this.state.whaleStatus}.gif" 
        alt="웨일 ${this.state.whaleStatus}단계" 
      />
      <h2 class="${this.state.page}-whale-name text-outline">Lv.${this.state.level} ${this.state.name}</h2>
    `;
  }
}
