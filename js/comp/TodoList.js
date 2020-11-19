export default class TodoList {
  constructor({ todoList, onToggleTodo, onRemoveTodo }) {
    this.todoList = todoList;
    this.onToggleTodo = onToggleTodo;
    this.onRemoveTodo = onRemoveTodo;

    this.$target = document.querySelector("#todo-list");

    this.render();
    this.bindEvent();
  }

  bindEvent() {
    this.$target.addEventListener("click", (e) => {
      if (e.target.tagName === "INPUT" && e.target.type === "checkbox") {
        this.onToggleTodo(e.target.parentNode.parentNode.dataset.id);
      }

      if (e.target.tagName === "INPUT" && e.target.type === "button") {
        this.onRemoveTodo({
          todoId: e.target.parentNode.dataset.id,
          isChecked: e.target.previousElementSibling.firstElementChild.checked,
        });
      }
    });
  }

  setState(nextTodoList) {
    this.todoList = nextTodoList;
    this.render();
  }

  makeTodoListHTMLString(todo) {
    return `
      <li data-id="${todo.id}">
        <label class="todo-label">
          <input class="todo-checkbox" type="checkbox" ${todo.isChecked ? "checked " : ""}/>
          <span class="checkmark"></span>
          <span class="todo-text">${todo.todo}</span>
        </label>
        <input type="button" class="remove-todo-btn" name="할 일 지우기" />
      </li>
    `;
  }

  render() {
    if (this.todoList.length === 0) {
      this.$target.innerHTML = `<p class="center text-blue" id="list-msg">첫 번째 할 일을 추가해보세요!</p>`;
    } else {
      this.$target.innerHTML = this.todoList
        .filter((todo) => todo.finishDate === null)
        .map((todo) => this.makeTodoListHTMLString(todo))
        .join("\n");
    }
  }
}
