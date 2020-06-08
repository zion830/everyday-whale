document.addEventListener('DOMContentLoaded', (event) => {
  const todo = new CompletedTodo()
})

class CompletedTodo {

  constructor() {
    this.completedTodoData = this.getCompletedTodoData()

    if(this.renderCompletedTodoNum() !== "no-item") {
      this.completedTodoData = this.completedTodoData.reverse()
      this.noTodoPerPage = 10
      this.pageNum = Math.ceil(this.completedTodoData.length / this.noTodoPerPage)

      this.renderPageNum()
      this.renderCompletedTodo(1)
      this.pageEventHandler()
    }
  }
  
  getCompletedTodoData() {
    try {
      const todoData = JSON.parse(localStorage["todoList"])
      const completedTodoData = todoData.filter( data => data.isChecked )
  
      return completedTodoData
  
    } catch (e) {
      return null
    }
  }

  renderCompletedTodoNum() {
    document.querySelector('#count').insertAdjacentHTML('beforeend', 
      `${(this.completedTodoData === null) ? "0" : this.completedTodoData.length}개`)
    
    if(this.completedTodoData === null || this.completedTodoData.length === 0) {
      const noItemMsg = document.createTextNode("아직 완료된 할 일이 없습니다!")
      document.querySelector('#no-item-msg').appendChild(noItemMsg)

      return "no-item"
    }
  }

  renderPageNum() {

    const target = document.querySelector('#pages')
    let pageHTML = ``
    let i = 0

    while(i < this.pageNum) {
      pageHTML += `<input type="button" id="page${i + 1}" class="page-num" value="${i + 1}" />`
      i++
    }

    target.insertAdjacentHTML('beforeend', pageHTML)
  }

  pageEventHandler() {

    const pageButtonContainer = document.querySelector('#pages')

    pageButtonContainer.addEventListener('click', (event) => {
      if(event.target.tagName === "INPUT") {
        this.renderCompletedTodo(event.target.value)
      }
    })
  }

  renderCompletedTodo(pageNum) {
    
    this.focusPageNum(pageNum)

    let todoHTML = ``
    const todoLength = this.completedTodoData.length
    const renderStartTodoIndex = this.noTodoPerPage * (pageNum - 1)
    
    for (let i = 0; i < this.noTodoPerPage && renderStartTodoIndex + i < todoLength; i++) {

      const data = this.completedTodoData[renderStartTodoIndex + i]

      todoHTML += `
        <li class="finish-item">
        ${data.todo}<br>
        <span class="period">
          진행기간 | ${data.addDate} ~ ${(data.finishDate === null) ? (this.getDateStr() + "*") : data.finishDate}
      `
    }

    const target = document.querySelector('#completed-todo-list')
    this.removeChildAll(target)
    target.insertAdjacentHTML('afterbegin', todoHTML)
  }

  focusPageNum(pageNum) {
    const pageNumbers = document.querySelectorAll('.page-num')

    pageNumbers.forEach( num => {
      num.className = num.className.replace(' selected-page-num', '')
    })

    const target = document.querySelector(`#page${pageNum}`)
    target.className += ' selected-page-num'
  }

  removeChildAll(parent) {
    while(parent.firstChild) {
      parent.removeChild(parent.lastChild)
    }
  }

  getDateStr() {
    const date = new Date()
    return `${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()}`
  }

}
