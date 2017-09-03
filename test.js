var StatusENUMS ={
    ACTIVE : "ACTIVE",
    COMPLETE: "COMPLETE",
    DELETED: "DELETED"
};

var todos ={
    1: {title: "Javascript", status: StatusENUMS.ACTIVE},
    2: {title: "React.js", status: StatusENUMS.ACTIVE},
    3: {title: "Node.js", status: StatusENUMS.ACTIVE}
};

var next_todo_id=4;

module.exports ={
    StatusENUMS : StatusENUMS,
    todos: todos,
    nextTodo: next_todo_id
};