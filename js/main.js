document.addEventListener('DOMContentLoaded', (event) => {
  
  if(existsName()) {
    const main = new Main()
    document.querySelector("#input-todo").focus()
  } else {
    history.replaceState({}, "start", "start.html")
    location.reload()
  }
})

function existsName() {
  if(localStorage.getItem("name") === null) {return false}
  else {return true}
}


class Main {

  LEVEL_SETTING = [0, 3, 8, 15, 26, Infinity]

  constructor() {
    this.name = localStorage.getItem("name")
    this.level = localStorage.getItem("level")
    this.todoList = this.getTodoList()

    this.renderWhaleInfo()
    this.rendereWhaleImg()
    this.renderTodoList()
    this.setEvent()
  }

  getTodoList() {
    try {
      return JSON.parse(localStorage["todoList"])
    } catch(e) {
      return new Array()
    }
  }

  getStatus(level) {
    for (let i = 0; i < this.LEVEL_SETTING.length; i++) {
      if(this.level < this.LEVEL_SETTING[i]) {return i}
    }
  }

  renderWhaleInfo() {
    const target = document.querySelector('#lv-name')
    target.innerHTML = `Lv.${this.level} ${this.name}`
  }

  rendereWhaleImg() {
    const target = document.querySelector('#whale-main')
    target.setAttribute('src', `img/whale${this.getStatus(this.level)}.gif`)
  }

  getDateStr() {
    const date = new Date()
    const dateStr = `${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()}`
  
    return dateStr
  }

  renderTodoList() {

    const target = document.querySelector('#todo-list')
    target.innerHTML = ""

    if(this.todoList === null || this.todoList.length === 0) {

      const todoMsg = `<p class="center text-blue">첫 번째 할 일을 추가해보세요!</p>`
      target.insertAdjacentHTML('afterbegin', todoMsg)

    } else {
      const listHTML = this.makeTodoListHTML(this.todoList)
      target.insertAdjacentHTML('afterbegin', listHTML)
    }
  }

  makeTodoListHTML(todoList) {
    
    let result = ``

    todoList.forEach( todo => {
      result += `
        <li>
          <label class="container" id="todo-${todo.id}">
            <span class="todo-text" id="todo-text-${todo.id}">${todo.todo}</span>
            <input type="checkbox" ${(todo.isChecked) ? "checked" : ""}/>
            <span class="checkmark"></span>
          </label>
          <input type="button" class="btn-finish" id="${todo.id}" />
        </li>
      `
    })

    return result
  }

  setEvent() {
    this.addTodoBtnEvent()
    this.enterKeyDownAddTodoEvent()
  }

  addTodoBtnEvent() {
    document.querySelector('#add-todo').addEventListener('click', this.insertTodoData.bind(this))
  }

  enterKeyDownAddTodoEvent() {
    document.querySelector('#input-todo').addEventListener('keypress', function(e) {
      // 엔터로 할 일 입력 완료
      if(e.keyCode === 13) { this.insertTodoData() }
    }.bind(this))
  }

  insertTodoData() {
    const todo = document.querySelector('#input-todo').value

    if (todo === "") {
      alert('할 일을 입력해주세요!')
    } else {
      const newTodo = {
        id : this.todoList.length,
        todo : todo, 
        isChecked : false, 
        addDate : this.getDateStr(), 
        finishedDate : null
      }

      const newTodoList = this.todoList.concat(newTodo)

      this.todoList = newTodoList
      localStorage.setItem("todoList", JSON.stringify(newTodoList))
      
      document.querySelector('#input-todo').value = ""
      this.renderTodoList()
    }
  }

  finishTodo(item) {
    var arr = JSON.parse(localStorage["todoList"])
  
    arr[item].finishDate = getDateStr()
    localStorage.setItem("todoList", JSON.stringify(arr))
    localStorage.setItem("sumCount", Number(localStorage.getItem("sumCount")) + 1)
  
    setLevel()
    location.reload()
  }
  
  removeTodo(value) {
    var arr = JSON.parse(localStorage["todoList"])
    arr.splice(value, 1)
  
    var id = 0
    arr.forEach(value => {
      value.id = id
      id++
    })
  
    localStorage.setItem("todoList", JSON.stringify(arr))
    location.reload()
  }
}