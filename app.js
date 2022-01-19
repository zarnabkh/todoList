//selectors

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');


//event listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click',deleteCheck);


//function
function addTodo(event){
    //prevent from submiting
    event.preventDefault();
    
    //DIV todo

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // create li
    const newTodo = document.createElement("li");
    newTodo.innerText= todoInput.value;
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

    todoInput.value = "";
}

function deleteCheck(e){
    const item =e.target;
    //delete todo item
    if(item.classList[0] === 'delete-btn'){
        const todo = item.parentElement;
        //animation
        todo.classList.add("fall");
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