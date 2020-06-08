// 웨일 캐릭터 이름 설정
function setName() {
  
  const name = document.querySelector('#whale-name').value

  if (name.length === 0) {
    
    const target = document.querySelector('#btn-start')
    const msg = `<p class="error-msg">웨일의 이름을 입력해주세요!</p>`

    target.insertAdjacentHTML('afterend', msg)

  } else {
    localStorage.setItem("name", name)
    localStorage.setItem("level", 1)
    localStorage.setItem("sumCount", 0)
    history.replaceState({}, "main", "index.html")
    location.reload()
  }
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('btn-start').addEventListener('click', setName)
})

document.querySelector('#whale-name').addEventListener('keypress', function(e) {
  // 엔터로 이름 입력 완료
  if(e.keyCode === 13) setName()
})