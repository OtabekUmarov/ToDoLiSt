let plus       = document.getElementById('plus')
let modal      = document.getElementById('modal')
let closeModal = document.getElementById('closeModal')
let title      = document.getElementById('title')
let text       = document.getElementById('text')
let select     = document.getElementById('select')
let date       = document.getElementById('date')
let table      = document.querySelector('.table')
let row2       = document.getElementById('row2')
let exits      = document.querySelector('.exits')
let bajaraman  = document.querySelector('.bajaraman')
let bajardim   = document.querySelector('.bajardim')

let count = 0
let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
<path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
</svg>`

let lists = []

let list = {
  titleIn: '',
  textIn: '',
  selectIn: '',
  dateIn: ''
}

if (localStorage.getItem('todoApp')) {
  try {
    lists = JSON.parse(localStorage.getItem('todoApp'))
  } catch (error) {
    localStorage.removeItem('todoApp')
  }
}

if (lists.length > 0) {
    show()
}

closeModal.addEventListener('click', ()=>{
  modal.classList.remove('active')
  list.titleIn  = title.value
  list.textIn   = text.value
  list.selectIn = select.value
  list.dateIn   = date.value

  console.log(date.value);

  lists.push(list)
  saveLoc()
  show()
})

function del(){
var delBtn = document.querySelectorAll('.delete')

delBtn.forEach(btn => {
  btn.addEventListener('click', ()=> {
    let id = btn.getAttribute('data-id')
    lists.splice(id, 1)
    saveLoc()
    show()
  })
})
}


function show(){
  count = 0
  table.innerHTML = `<div class="row lists item1" id="row"></div>`
  lists.forEach(list => {
    var color = ''
    if (list.selectIn == 'Ish') {
      color = '#F4A4A9'
    } else if (list.selectIn == 'Shahsiy') {
      color = '#9FE3E8'
    } else if (list.selectIn == 'Uy') {
      color = '#ffdc7b'
    } else if (list.selectIn == "O'qish") {
      color = '#c6e8b0'
    }
    table.innerHTML += `
    <div class="col-6">
      <div class="list" style='background:${color}'>
        <button class="delete" data-id='${count}'>
            ${svg}
        </button>
        <div class="list__title">
          ${list.titleIn}
        </div>
        <div class="list__text">
        ${list.textIn}
        </div>
        <div class="list__author">
          <div class="date">
          ${list.dateIn}
          </div>
          <div class="who">
          ${list.selectIn}
          </div>
        </div>
      </div>
    `
    count ++
  })
  bajaraman.innerHTML = count
  del()
}


plus.addEventListener('click', ()=>{
  modal.classList.add('active')
})

exits.addEventListener('click', ()=> {
  modal.classList.remove('active')
})

function saveLoc() {
  localStorage.setItem('todoApp', JSON.stringify(lists))
}

var buttons = document.querySelectorAll('.btns button')
var items = document.querySelectorAll('.lists')
buttons.forEach(i => {
    i.addEventListener('click',(e)=>{
        document.querySelector('.btns button.active').classList.remove('active')
        i.classList.add('active')
        e.preventDefault()
        var link = i.getAttribute('data-link') 
        items.forEach(item => {
            if (item.classList.contains(link)){
                item.style.display = 'block'
            } else {
                item.style.display = 'none'
            }
        })
    })
})