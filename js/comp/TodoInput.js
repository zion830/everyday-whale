export default class TodoInput {
  constructor({ onAddTodo }) {
    this.onAddTodo = onAddTodo;
    this.$target = document.querySelector("#todo-input");

    this.render();
    this.bindAddTodoEvent();

    document.querySelector("#input-todo").focus();
  }

  bindAddTodoEvent() {
    document.querySelector("#input-todo").addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.onAddTodo(e.target.value);
        e.target.value = "";
      }
    });

    document.querySelector("#add-todo-btn").addEventListener("click", (e) => {
      this.onAddTodo(e.target.previousElementSibling.value);
      e.target.previousElementSibling.value = "";
    });
  }

  render() {
    this.$target.innerHTML = `
      <input type="text" placeholder="새로운 할 일" id="input-todo" />
      <input type="button" id="add-todo-btn" class="add-todo-btn" />
    `;
  }
}
