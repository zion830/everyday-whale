// document.addEventListener('DOMContentLoaded', (event) => {
  
//   if(existsName()) {
//     start() 
//     document.querySelector("#input-to-do").focus()
//   } else {
//     history.replaceState({}, "start", "start.html")
//     location.reload()
//   }
// })

// function existsName() {
//   if(localStorage.getItem("name") === null) {return false}
//   else {return true}
// }

function start() {

  const name = localStorage.getItem("name")
  const level = localStorage.getItem("level")
  const status = getStatus(level)

  // $('.whale-info').text('Lv.' + level + ' ' + name)
  // $('.whale-info2').html('Lv.' + level + " " + name + ' <span><input type="button" value="이름 변경" class="btn-edit"></span>');
  // $('.btn-edit').click(function () {
  //   var newName = prompt('새로운 이름을 지어주세요!', name)
  //   if (newName.length > 0) {
  //     localStorage.setItem("name", newName)
  //     location.reload(true)
  //   }
  //   else
  //     alert("1자 이상의 이름을 지어주세요.\n이름 없는 고래가 되면 슬프잖아요.")
  // });

  setLevel()
  setWhale(status)
  initList()

  // $('.btn-add').click(function () {
  //   insertData()
  // })

  // var check = true
  // $(".container").click(function () {
  //   var id = Number(this.id.substring(5, this.id.length))
  //   if (check) {
  //     var todoList = JSON.parse(localStorage["todoList"])
  //     todoList[id].isChecked = !todoList[id].isChecked
  //     localStorage.setItem("todoList", JSON.stringify(todoList))

  //     setItemLineThrough(id, todoList[id].isChecked)
  //   }

  //   check = !check;
  // });

  $('.btn-finish').click(function () {
    var todoList = JSON.parse(localStorage["todoList"])
    if (todoList[this.id].isChecked)
      finish(this.id)
    else
      removeItem(this.id)
  })

  // $("#input-to-do").keypress(function (e) {
  //   if (e.which === 13) insertData()
  // })
}

// function renderWhaleInfo() {
//   const target = document.querySelector('#lv-name')
//   target.innerHTML = `Lv.${this.level} ${this.name}</span>`
// }

// class Todo {
//   constructor(id, todo, isChecked, addDate, finishDate) {
//     this.id = id;
//     this.todo = todo;
//     this.isChecked = isChecked;
//     this.addDate = addDate;
//     this.finishDate = finishDate;
//   }
// }

// function insertData() {
//   var todo = $('#input-to-do').val();
//   if (todo === "")
//     alert('할 일을 입력해주세요!');
//   else {
//     var todoList;
//     try {
//       todoList = JSON.parse(localStorage["todoList"]);
//     } catch (e) {
//       todoList = new Array();
//     }

//     var newItem = new Todo(todoList.length, todo, false, getDateStr(), null);
//     todoList.push(newItem);
//     localStorage.setItem("todoList", JSON.stringify(todoList));
//     location.reload();
//   }
// }

// function initList() {
//   var str = '<ul class="todo-list">';

//   try {
//     var id = 0;
//     $('#list-msg').text('');
//     const todoList = JSON.parse(localStorage["todoList"]);

//     const start = '<li><label class="container" id="todo-';
//     const start2 = '">';
//     const checkEnd = '<input type="checkbox" checked="checked"><span class="checkmark"></span></label>' +
//       '<input type="button" class="btn-finish" id="';
//     const unCheckedEnd = '</span><input type="checkbox"><span class="checkmark"></span></label>' +
//       '<input type="button" class="btn-finish" id="';
//     const end = '"></li>';

//     todoList.forEach(value => {
//       console.log(value.isChecked);
//       if (value.isChecked && value.finishDate === null) {
//         str += start + id + start2 + "<span class=\"todo-text\" id=\"todo-text-" + id + "\">"
//           + value.todo + "</span>" + checkEnd + id + end;
//       }
//       else if (!value.isChecked && value.finishDate === null) {
//         str += start + id + start2 + "<span class=\"todo-text\" id=\"todo-text-" + id + "\">"
//           + value.todo + "</span>" + unCheckedEnd + id + end;
//       }
//       id++;
//     });

//   } catch (e) {
//     $('#list-msg').text('첫 번째 할 일을 추가해보세요!');
//   }

//   str += '<li>\n' +
//     '        <input type="text" placeholder="새로운 할 일" id="input-to-do">\n' +
//     '        <input type="button" id="add-to-do" class="btn-add">\n' +
//     '    </li></ul>';

//   $('#todo-list').html(str);

//   setLineThrough();
// }

// function setLineThrough() {
//   let id = 0;
//   try {
//     const todoList = JSON.parse(localStorage["todoList"]);

//     todoList.forEach(value => {
//       if (value.isChecked && value.finishDate === null) {
//         $(`#todo-text-${id}`).css("text-decoration", "line-through");
//       } else if (!value.isChecked && value.finishDate === null) {
//         $(`#todo-text-${id}`).css("text-decoration", "none");
//       }

//       id++;
//     });
//   } catch (e) {
//   }
// }

// function setItemLineThrough(id, status) {
//   $(`#todo-text-${id}`).css("text-decoration", status ? "line-through" : "none");
// }

// function finish(value) {
//   var arr = JSON.parse(localStorage["todoList"]);

//   arr[value].finishDate = getDateStr();
//   localStorage.setItem("todoList", JSON.stringify(arr));
//   localStorage.setItem("sumCount", Number(localStorage.getItem("sumCount")) + 1);

//   setLevel();
//   location.reload();
// }

// function removeItem(value) {
//   var arr = JSON.parse(localStorage["todoList"])
//   arr.splice(value, 1);

//   var id = 0;
//   arr.forEach(value => {
//     value.id = id
//     id++
//   })

//   localStorage.setItem("todoList", JSON.stringify(arr))
//   location.reload()
// }

// function setWhale(status) {
//   let imgStr = `/img/whale${status}.gif`;

//   $('#whale-main').attr("src", imgStr);
//   $('#whale-whalepage').attr("src", imgStr);
// }

// function getStatus(level) {
//   if (level < 4) {
//     return 1
//   } else if (level < 9) {
//     return 2
//   } else if (level < 16) {
//     return 3
//   } else if (level < 27) {
//     return 4
//   } else {
//     return 5
//   }
// }

function setLevel() {
  const count = localStorage.getItem("sumCount")
  let exp, level = 0

  if (count < 9) {
    exp = ((count % 3) / 3 * 100).toFixed(1) + "%"
    level = Math.floor(count / 3 + 1)
  } else if (count < 34) {
    exp = (((count - 9) % 5) / 5 * 100).toFixed(1) + "%"
    level = 4 + Math.floor((count - 9) / 5)
  } else if (count < 52) {
    exp = (((count - 34) % 6) / 6 * 100).toFixed(1) + "%"
    level = 9 + Math.floor((count - 34) / 6)
  } else if (count < 108) {
    exp = (((count - 52) % 7) / 7 * 100).toFixed(1) + "%"
    level = 12 + Math.floor((count - 52) / 7)
  } else if (count < 154) {
    exp = (((count - 108) % 8) / 8 * 100).toFixed(1) + "%"
    level = 20 + Math.floor((count - 108) / 8)
  } else {
    exp = ((count - 162) / 10 * 100).toFixed(1) + "%"
    level = 27 + Math.floor((count - 162) / 10)
  }

  localStorage.setItem("level", level)
  localStorage.setItem("exp", exp)
}

// function getDateStr() {
//   const date = new Date()
//   const dateStr = `${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()}`

//   return dateStr
// }