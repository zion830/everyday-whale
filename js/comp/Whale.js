export default class Whale {
  constructor({ name, level, whaleStatus }) {
    this.state = {
      name: name,
      level: level,
      whaleStatus: whaleStatus,
    };

    this.$target = document.querySelector("#main-whale");

    this.render();
  }

  setState({ nextName, nextLevel }) {
    if (nextName) this.state.name = nextName;
    if (nextLevel) this.state.level = level;

    this.render();
  }

  render() {
    this.$target.innerHTML = `
      <img 
        class="main-whale-img swing" 
        src="./img/whale${this.state.whaleStatus}.gif" 
        alt="웨일 ${this.state.whaleStatus}단계" 
      />
      <h2 class="main-whale-name text-outline">Lv.${this.state.level} ${this.state.name}</h2>
    `;
  }
}
