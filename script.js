const button = document.querySelector('.button')
const intput= document.querySelector('.input')
const todoContainer = document.querySelector('.todos-container')
let localData = JSON.parse(localStorage.getItem('todoList')) // get the todoList from localStorage
let todoList = []
document.addEventListener('DOMContentLoaded', () => {
    if (localData) {
        todoList = localData // if there is data in localStorage, use it
    } else {
        todoList = [] // otherwise, initialize an empty array
    }
    renderTodoList(todoList) // render the todo list on page load
})
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
button.addEventListener('click', (even) => {
    even.preventDefault()
    const inputValue = intput.value.trim()
   if(inputValue.length> 0) {
        todoList.push({id:uuid(), text: inputValue, iscompleted: false})
        intput.value = ''
    }
    console.log(todoList)
     renderTodoList(todoList)
    localStorage.setItem('todoList', JSON.stringify(todoList)) // save the todoList to localStorage
}) 

todoContainer.addEventListener('click', (event) => {
    //i use data- attributes to use the event delegation method
   let key = event.target.dataset.key// get the key from the data-key attribute
   let deleteTodoKey=event.target.dataset.todokey // get the key from the data-todokey attribute
  todoList = todoList.map(todo=> todo.id === key ? {...todo, iscompleted: !todo.iscompleted} : todo)
  todoList = todoList.filter(todo => todo.id !== deleteTodoKey) // filter out the todo with the matching id
  console.log(todoList)
  renderTodoList(todoList)
  localStorage.setItem('todoList', JSON.stringify(todoList)) // save the todoList to localStorage

})
function renderTodoList(todoList){
    todoContainer.innerHTML = todoList.map(({id,text,iscompleted}) => 
        `
    <div class="todo relative"> 
    <input id='item-${id}' type="checkbox" data-key=${id} ${iscompleted? "checked" :""} class="t-checkbox"> 
    <label for="item-${id}" class="todo todo-text t-pointer ${iscompleted? "checked-todo" :""}" data-key=${id}>${text}</label> 
    <button class="button cursor absolute right-0" ><span class="material-icons-outlined del-btn" data-todokey=${id}>
delete
</span></button> 
    </div>
    `)
}
