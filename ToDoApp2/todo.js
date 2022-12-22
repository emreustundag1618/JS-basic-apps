// Selecting all needed elements
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners() { // All event listeners
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
    secondCardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", filterTodos);
    clearButton.addEventListener("click", clearAllTodos);
}

function filterTodos(e) { // Filters todos when typed second input
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function (listItem) {
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1) {
            // cant find
            listItem.setAttribute("style", "display: none !important");
        } else {
            listItem.setAttribute("style", "display: flex"); // for bootstrap d-flex
        }
    })
}

function clearAllTodos(e) {
    if (confirm("Are you sure about deleting all tasks")) {
        // method 1: a slower one
        // todoList.innerHTML = "";

        // method 2: a faster one
        while (todoList.firstElementChild !== null) {
            todoList.removeChild(todoList.firstElementChild);
            console.log(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
    }
}

function deleteTodo(e) { // Deletes todo from UI

    const listItem = e.target.parentElement.parentElement;

    if (e.target.className === "fa fa-remove") {
        listItem.remove();
        deleteTodoFromStorage(listItem.textContent)
        showAlert("success", "Todo successfully deleted.")
    }

}

function deleteTodoFromStorage(deletedTodo) { // Deletes todo from storage
    let todos = getTodosFromStorage();

    console.log(todos)

    todos.forEach(function (todo, index) {
        if (todo === deletedTodo) {
            todos.splice(index, 1); // delete a todo from returned array from local storage
        }
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadAllTodosToUI() { // Loads all todos from local storage to UI
    let todos = getTodosFromStorage();

    todos.forEach(function (todo) {
        addTodoToUI(todo);
    })
}

function addTodo(e) { // A function to be called when submitted
    const newTodo = todoInput.value.trim();

    if (newTodo === "") {
        /* 
        <div class="alert alert-danger" role="alert">
            This is a danger alert—check it out!
        </div>
         */
        showAlert("danger", "Please type a todo!");
    } else {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);

        showAlert("success", "Todo başarıyla eklendi")
    }

    e.preventDefault();
}


function getTodosFromStorage() { // Getting todos from local storage
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addTodoToStorage(newTodo) { // Setting todos to local storage
    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos", JSON.stringify(todos));

}

function showAlert(type, message) { // Shows alert messages after adding todo
    const alert = document.createElement("div");

    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    firstCardBody.appendChild(alert);

    window.setTimeout(function () {
        alert.remove();
    }, 3000);

}

function addTodoToUI(newTodo) { // Adds string value to UI as a list item
    /* 
    <li class="list-group-item d-flex justify-content-between">
        Todo 1
        <a href="#" class="delete-item">
            <i class="fa fa-remove"></i>
        </a>
    </li>
    */

    // Creating list item
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between";

    // Creating link
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class='fa fa-remove'></i>";

    // Adding text node
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    // Adding list item to Todo List
    todoList.appendChild(listItem);
    // After adding item, input value must be cleared
    todoInput.value = "";
}