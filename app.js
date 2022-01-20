//selectors

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('filter-todo');


//event listeners
document.addEventListener("DOMContentLoaded", getTodos)
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener("click", filterTodo);


//function
function addTodo(e){
    //prevent from submiting
    e.preventDefault();
    
    //DIV todo

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // create li
    const newTodo = document.createElement("li");
    newTodo.innerText= todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //add todo to local storage
    saveLocalTodos(todoInput.value)

    //checkmark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class='fas fa-check'></i>";
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    /*edit button
    const editButton = document.createElement("button");
    editButton.innerHTML = "<i class='fas fa-pencil'></i>";
    editButton.classList.add("edit-btn");
    todoDiv.appendChild(editButton);
    */

    //trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";
    trashButton.classList.add("delete-btn");
    todoDiv.appendChild(trashButton);

    //append to list
    todoList.appendChild(todoDiv);

    todoInput.value = "";
}

function deleteCheck(e){
    const item =e.target;
    //delete todo item
    if(item.classList[0] === 'delete-btn'){
        const todo = item.parentElement;
        //animation
        todo.classList.add("fall");
        
        //remove todo from the local storage
        removeTodo(todo)
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }

    //checkmark
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.style.textDecoration = "line-through";
        todo.style.opacity = "0.5";
    }
}

//filter function
function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
            switch(e.target.value){
            case "all":
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                } 
                break;
                case "incompleted":
                    if(!todo.classList.contains("completed")){
                        todo.style.display = "none";
                    }else{
                        todo.style.display = "flex";
                    }
                     break;

        }
        });
}

function saveLocalTodos(todo){
    //check if the task is in already in the list
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
        //DIV todo

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // create li
    const newTodo = document.createElement("li");
    newTodo.innerText= todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //checkmark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class='fas fa-check'></i>";
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    /*edit button
    const editButton = document.createElement("button");
    editButton.innerHTML = "<i class='fas fa-pencil'></i>";
    editButton.classList.add("edit-btn");
    todoDiv.appendChild(editButton);
    */

    //trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";
    trashButton.classList.add("delete-btn");
    todoDiv.appendChild(trashButton);

    //append to list
    todoList.appendChild(todoDiv);
    })

}

// remove local storage item
function removeLocalTodo(todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos", JSON.stringify(todos));
}