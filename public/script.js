console.log("in script file");


const RESPONSE_DONE = 4;
const STATUS_OK = 200;
const TODOS_LIST_ID = "todos_list_div";
const NEW_TODO_INPUT_ID = "new_todo_input";
const TODOS_COMPLETED_LIST = "completedToDoList";
const TODOS_DELETED_LIST = "deletedToDoList";


//loading getToDosAJAX function everytime as page loads
window.onload = getTodosAJAX();


//function to add Todo elements
function addTodoElements(id, todos_data_json) {
    var todos = JSON.parse(todos_data_json);
    var parent = document.getElementById(id);
    parent.innerHTML = "";
    if (parent) {
        // todos { id : {todo object}, id : {todo:object} ..}
        Object.keys(todos).forEach(
            function (key) {
                var todo_element = createTodoElement(key, todos[key]);
                parent.appendChild(todo_element);
                // NEW_TODO_INPUT_ID.reset();
            }
        )
    }
}

// todo_object : {title: A Task, status : ACTIVE}
//function to create new element
function createTodoElement(id, todo_object) {
    var todo_element = document.createElement("div");
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";    // make the element a checkbox
    checkbox.setAttribute("onclick", " completeTodoAJAX(" + id + ")");  //set onclicklistener on checkbox
    todo_element.appendChild(checkbox);   // add the box to the element
    todo_element.appendChild(document.createTextNode(todo_object.title));
    todo_element.setAttribute("data-id", id);
    todo_element.setAttribute(
        "class", "todoStatus" + todo_object.status + " " + "breathVertical"
    );

    if (checkbox.checked) {
        alert("checked");
    }
    if (todo_object.status === "ACTIVE") {
        var changebutton = document.createElement("button");
        changebutton.innerText = "Change";
        changebutton.setAttribute("onclick", "changeTodoAJAX("+id+")");
        changebutton.setAttribute("class", "breathHorizontal");
        todo_element.appendChild(changebutton);
        console.log("in changed");

    }

    if (todo_object.status !== "DELETED") {
        var delete_button = document.createElement("button");
        delete_button.className="material-icons";
        delete_button.innerText = "Delete";
        //delete_button.color="#ff331f";
        delete_button.setAttribute("onclick", "deleteTodoAJAX(" + id + ")");
        delete_button.setAttribute("class", "breathHorizontal");
        todo_element.appendChild(delete_button);
    }


    return todo_element;
}

//get request
function getTodosAJAX() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/todos", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === RESPONSE_DONE) {
            if (xhr.status === STATUS_OK) {
                console.log(xhr.responseText);
                addTodoElements(TODOS_LIST_ID, xhr.responseText);
            }
        }
    };
    xhr.send(data = null);
}


function addTodoAJAX() {
    var title = document.getElementById(NEW_TODO_INPUT_ID).value;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/todos", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var data = "todo_title=" + encodeURI(title);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === RESPONSE_DONE) {
            if (xhr.status === STATUS_OK) {
                addTodoElements(TODOS_LIST_ID, xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    };
    xhr.send(data);
}


function completeTodoAJAX(id) {
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "/api/todos/" + id, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    data = "todo_status=COMPLETE";
    xhr.onreadystatechange = function () {
        if (xhr.readyState === RESPONSE_DONE) {
            if (xhr.status === STATUS_OK) {
                // addTodoElements(TODOS_LIST_ID, xhr.responseText);
                AddTodoCompleteElement(TODOS_COMPLETED_LIST, xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    };
    xhr.send(data);
}


function deleteTodoAJAX(id) {
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/api/todos/" + id, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    data = "todo_status=DELETED";
    xhr.onreadystatechange = function () {
        if (xhr.readyState === RESPONSE_DONE) {
            if (xhr.status === STATUS_OK) {
               // DeleteTodoElement(TODOS_LIST_ID, xhr.responseText);
                DeleteTodoElement(TODOS_DELETED_LIST,xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    };
    xhr.send(data)
}


function changeTodoAJAX(id) {
    var newToDoItem = prompt("enter the new value of todo");
    var title = newToDoItem;
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "/api/todos/" +id, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var data = "todo_title=" + encodeURI(title);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === RESPONSE_DONE) {
            if (xhr.status === STATUS_OK) {
                addTodoElements(TODOS_LIST_ID, xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    };
    xhr.send(data);
    console.log("in change");
}

//AddTodoCompleteElement(Arguments)
function AddTodoCompleteElement(TODOS_COMPLETED_LIST, list) {

    var todos = JSON.parse(list);
    var id = TODOS_COMPLETED_LIST;
    console.log(todos);
    var parent = document.getElementById(id);
    parent.innerText = "";
    if (parent) {
        Object.keys(todos).forEach(
            function (key) {
                if (todos[key].status === "COMPLETE") {
                    var todo_element = createTodoElement(key, todos[key]);
                    parent.appendChild(todo_element);
                }
            }
        )
    }
    addTodoElements(TODOS_LIST_ID, list);
}

function DeleteTodoElement(TODOS_DELETED_LIST ,list)
{

    var todos = JSON.parse(list);
    var id = TODOS_DELETED_LIST;
    console.log(todos);
    var parent = document.getElementById(id);
    parent.innerText = "";
    if(parent)
    {
        Object.keys(todos).forEach(
            function (key) {
                if(todos[key].status === "DELETED")
                {
                    var todo_element = createTodoElement(key,todos[key]);
                    parent.appendChild(todo_element);
                }
            }
        )
    }
    AddTodoCompleteElement(TODOS_COMPLETED_LIST, list);
}