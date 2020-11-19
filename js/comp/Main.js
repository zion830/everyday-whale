import Whale from "./Whale.js";
import TodoList from "./TodoList.js";
import { getLocalStorageItem, setLocalStorageItem, getLocalStorageJSONItem } from "../util/localStorage.js";
import { LEVEL_SETTING } from "../util/constants.js";
import { getDateStr } from "../util/util.js";
import TodoInput from "./TodoInput.js";

export default class Main {
  constructor() {
    this.name = getLocalStorageItem({ key: "name" });
    this.level = getLocalStorageItem({ key: "level" });
    this.todoList = getLocalStorageJSONItem({ key: "todoList", defalutValue: [] });

    this.components = {
      whale: new Whale({
        name: this.name,
        level: this.level,
        whaleStatus: this.getStatus(this.level),
      }),
      todoList: new TodoList({
        todoList: this.todoList,
        onToggleTodo: this.onToggleTodo.bind(this),
        onRemoveTodo: this.onRemoveTodo.bind(this),
      }),
      todoInput: new TodoInput({ onAddTodo: this.onAddTodo.bind(this) }),
    };
  }

  getStatus() {
    for (let i = 0; i < LEVEL_SETTING.length; i++) {
      if (this.level < LEVEL_SETTING[i]) {
        return i;
      }
    }
  }

  setState({ nextTodoList }) {
    if (nextTodoList) {
      this.todoList = nextTodoList;
      setLocalStorageItem({ key: "todoList", item: nextTodoList });

      this.components.todoList.setState(this.todoList);
    }
  }

  onAddTodo(todoText) {
    const nextTodoList = [
      ...this.todoList,
      {
        id: this.todoList.length === 0 ? 0 : this.todoList.length + 1,
        todo: todoText,
        isChecked: false,
        addDate: getDateStr(),
        finishDate: null,
      },
    ];

    this.setState({ nextTodoList });
  }

  onToggleTodo(todoId) {
    const nextTodoList = this.todoList.slice();
    const toggledTodoIndex = nextTodoList.findIndex((todo) => todo.id == todoId);

    nextTodoList.splice(toggledTodoIndex, 1, {
      ...nextTodoList[toggledTodoIndex],
      isChecked: !nextTodoList[toggledTodoIndex].isChecked,
    });

    this.setState({ nextTodoList });
  }

  onRemoveTodo({ todoId, isChecked }) {
    console.log(isChecked);
    const nextTodoList = this.todoList.slice();
    const removedTodoIndex = nextTodoList.findIndex((todo) => todo.id == todoId);

    if (isChecked) {
      nextTodoList.splice(removedTodoIndex, 1, {
        ...nextTodoList[removedTodoIndex],
        finishDate: getDateStr(),
      });
    } else {
      nextTodoList.splice(removedTodoIndex, 1);
    }

    this.setState({ nextTodoList });
  }
}
