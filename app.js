//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const clearButton  = document.querySelector('.clear-btn');
const todoContainer = document.querySelector('.todo-container')
//event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", handleDeleteAndCheck);
filterOption.addEventListener("click", filterTodo);
clearButton.addEventListener('click', clearAll);

//functions
function addTodo(e) {
  e.preventDefault();

  //todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //capitalize first letter function
  const capitalize = (val) => {
    if (typeof val !== "string") {
      return val;
    } else {
      return val.charAt(0).toUpperCase() + val.slice(1);
    }
  };

  //create li
  if (todoInput.value !== "" && todoInput.value !== ' ') {
    const newTodo = document.createElement("li");
    newTodo.innerText = capitalize(todoInput.value);
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //add todo to local storage
    saveLocalTodos(todoInput.value);

    //CHECK MARK BUTTON
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //CHECK trash BUTTON
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //APPEND TO LIST
    //todoList.appendChild(todoDiv);
    todoList.insertBefore(todoDiv, todoList.children[0]);
  } else {
    alert("Oops! You forgot to add an item.");
  }

  //clear todo input value
  todoInput.value = "";
}

function handleDeleteAndCheck(e) {
  const item = e.target;
  console.log(item.classList);
  //delete todo
  if (item.classList.contains("trash-btn")) {
    const todo = item.parentElement;
    // todo.remove();
    item.parentNode.classList.add("fall");

    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  if (item.classList.contains("complete-btn")) {
    item.parentNode.classList.toggle("completed");
  }
}

/*
function filterTodo(e) {
  const todos = todoList.childNodes;

  if(todos[0] === '#text'){
    todos[0].remove();
  }
  //todos[0].remove();
  console.log(todos);
  console.log(typeof todos);
  //console.log("e.target.value: ",e.target.value); 

  todos.forEach(function (todo) {
    console.log("todo: ",todo);
    todo.nodeName === "#text" ? todo.remove() : todo;
    //console.log(e.target.value);
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;

      case "completed":
        if (todo.classList.contains("completed")) {
          console.log("should contain completed: " + todo.classList);
          todo.style.display = "flex";
         
        } else {
          todo.style.display = "none";
        }
        break;

      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}
*/

function filterTodo(e) {
    const todos = todoList.childNodes;
    console.log(typeof todos);
    console.log(todos);

    todos.forEach( todo => {

        const currentValue = e.target.value;
        todo.nodeName === "#text" ? todo.remove() : todo;
        console.log(todo.classList);

        if(currentValue === 'all'){
            todo.style.display = 'flex';
        } else if(currentValue === 'completed'){
            todo.classList.contains("completed") ? todo.style.display = "flex" : todo.style.display = 'none';
            console.log("should contain completed: " + todo.classList);
        } else if(currentValue !== 'completed') {
            !todo.classList.contains("completed") ? todo.style.display = 'flex' : todo.style.display = 'none';
        }
    })
}

function saveLocalTodos(todo){
    //check if there is staff in there already
    let todos;
    if (localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));


}

function getTodos(){
  console.log('helloME')
  if (localStorage.getItem('todos') === null){
      todos = [];
  } else {
      todos = JSON.parse(localStorage.getItem('todos'))
  }
  //todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));

  todos.forEach(function(todo) {

    //todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

  
    //CHECK MARK BUTTON
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //CHECK trash BUTTON
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //APPEND TO LIST
    todoList.appendChild(todoDiv);
      
  });
};

/*function clearAll () {
  console.log(todoContainer)
  console.log(todoList)
  todoContainer.removeChild();
  const listRemake = document.createElement('ul');
  todoContainer.appendChild(listRemake);
  listRemake.classList.add('todo-list');
  listRemake.nextElementSibling.remove();
  alert('done')
};*/

function clearAll () {
  
  const nodes = todoList.childNodes;
  localStorage.clear();
  console.log(todoList.childNodes);
  while(todoList.childNodes.length > 0){
     todoList.childNodes.forEach( function (node){node.remove()});
  };
  console.log(todoList.childNodes)
  alert('Nice job!!!')
}