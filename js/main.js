document.addEventListener('DOMContentLoaded', (event) => {
  
  if(isExistName()) {
    const main = new Main()
    document.querySelector("#input-todo").focus()
  } else {
    history.replaceState({}, "start", "start.html")
    location.reload()
  }
})

function isExistName() {
  return localStorage.getItem("name") !== null
}


class Main {

  LEVEL_SETTING = [0, 3, 8, 15, 26, Infinity]

  constructor() {
    this.name = localStorage.getItem("name")
    this.level = localStorage.getItem("level")

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
    const todoList = this.getTodoList()
    const target = document.querySelector('#todo-list')
    target.innerHTML = ""

    if(todoList === null || todoList.length === 0) {
      const todoMsg = `<p class="center text-blue" id="list-msg">첫 번째 할 일을 추가해보세요!</p>`
      target.insertAdjacentHTML('afterbegin', todoMsg)
    } else {
      const listHTML = this.makeTodoListHTML(todoList.filter( todo => todo.finishDate === null))
      target.insertAdjacentHTML('afterbegin', listHTML)
    }
  }

  makeTodoListHTML(todoList) {
    
    let result = ``

    todoList.forEach( todo => {
      result += `
        <li>
          <label class="container" id="todo-${todo.id}">
            <input type="checkbox" ${(todo.isChecked) ? "checked" : ""}/>
            <span class="todo-text">${todo.todo}</span>
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
    this.finishTodoEvent()
    this.removeTodoEvent()
  }

  addTodoBtnEvent() {
    document.querySelector('#add-todo').addEventListener('click', () => {
      this.insertTodoData()
    })
  }

  enterKeyDownAddTodoEvent() {
    document.querySelector('#input-todo').addEventListener('keypress', (e) => {
      // 엔터로 할 일 입력 완료
      if(e.keyCode === 13) { this.insertTodoData() }
    })
  }

  insertTodoData() {
    const todo = document.querySelector('#input-todo').value

    if (todo === "") {
      alert('할 일을 입력해주세요!')
    } else {
      const todoList = this.getTodoList()

      const newTodo = {
        id : (todoList.length > 0) ? todoList[todoList.length-1].id + 1 : 0,
        todo : todo, 
        isChecked : false, 
        addDate : this.getDateStr(), 
        finishDate : null
      }

      const newTodoList = todoList.concat(newTodo)

      localStorage.setItem("todoList", JSON.stringify(newTodoList))
      
      document.querySelector('#input-todo').value = ""
      this.renderTodoList()
    }
  }

  finishTodoEvent() {
    document.querySelector('#todo-list').addEventListener('click', (e) => {
      const target = e.target

      if(target.tagName === "INPUT" && target.type === "checkbox") {
        const checkedTodoId = Number(target.parentNode.id.replace("todo-", ""))
        let newTodoList = this.getTodoList()

        newTodoList.find( todo => todo.id === checkedTodoId).isChecked = target.checked

        localStorage.setItem("todoList", JSON.stringify(newTodoList))
      }
    })
  }
  
  removeTodoEvent() {
    document.querySelector('#todo-list').addEventListener('click', (e) => {
      const target = e.target

      if(target.tagName === "INPUT" && target.type === "button") {
        const removedTodoId = Number(target.id)
        let newTodoList = this.getTodoList()

        if(!newTodoList.find( todo => todo.id === removedTodoId).isChecked) {
          const removedTodoIndex = newTodoList.indexOf(newTodoList.find( todo => todo.id === removedTodoId))
          newTodoList.splice(removedTodoIndex, 1)
        } else {
          newTodoList.find( todo => todo.id === removedTodoId).finishDate = this.getDateStr()
        }

        localStorage.setItem("todoList", JSON.stringify(newTodoList))
        this.renderTodoList()
      }
    })
  }
}