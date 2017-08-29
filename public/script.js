console.log("in script.js");
const RESPONSE_CODE=4;
const STATUS_OK=200;
const TODOS_LIST_ID="todos_list_div";


function add_todo_element(id,todos_data_json) {
    var parent = document.getElementById(id);
    parent.innerText=todos_data_json;
}

function getToDosAJAX(){
    console.log("in ajax method")

    var xhr = new XMLHttpRequest();
    xhr.open("GET","/api/todos",true);

    xhr.onreadystatechange = function () {
        console.log("in ready ");

        if (xhr.readyState === RESPONSE_CODE) {           //when ready state is 4 then state is ready read mdn docs
           if(xhr.status === STATUS_OK){
              console.log(xhr.responseText);
              add_todo_element(TODOS_LIST_ID,xhr.responseText);
         }
       }
    }

    xhr.send(data= null);
    console.log("in end");
}