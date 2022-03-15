let storeageKey = "todolist";
let dataString = localStorage.getItem(storeageKey);
let taskList;
if (dataString) {
    taskList = JSON.parse(dataString);
} else {
    taskList = []
}
let arrStatus = [];
for (let i = 0; i < taskList.length; i++) {
    arrStatus.push(false)
}
function showTaskList() {
    let drawTable = '';
    for (let i = 0; i < taskList.length; i++) {
        let j = i +1;
        drawTable+='<tr>'+
            '<th>'+j+'</th>'+
            '<td>'+taskList[i]+'</td>'+
            '<td>'+'<button type="button" class="btn btn-primary" id="'+i+'" onclick="changeBtnStatus(this.id)">Not Completed</button>'+'</td>'+
            '<td>'+'<button class="btn btn-primary" onclick="editTask('+i+')" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Edit</button>'+
            '<button class="btn btn-danger" onclick="deleteTask('+i+')" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Delete</button>' +'</td>'+
            '</tr>'
    }
    document.getElementById("drawTable").innerHTML = drawTable;
    document.getElementById("items").value = "";
}
showTaskList();

function changeBtnStatus(id) {
    arrStatus[id] = !arrStatus[id];
    if(arrStatus[id]){
        document.getElementById(id).innerHTML = 'Completed';
    } else {
        document.getElementById(id).innerHTML = 'Not Completed';
    }
    localStorage.setItem(storeageKey, JSON.stringify(taskList))
}

function createTask() {
    let newTask = document.getElementById('items').value;
    if(newTask.trim() === ''){
        document.getElementById('validate').innerHTML = 'The name Task is required! Please try again!';
        return;
    } else {
        taskList.push(newTask);
        document.getElementById('validate').innerHTML = '<span style="color: green">Create Task Success!!</span>';
        showTaskList();
    }
    localStorage.setItem(storeageKey, JSON.stringify(taskList));

}

function editTask(index) {
    document.getElementById("exampleModal").innerHTML = `<div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">New message</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                    <div class="form-group">
                        <label for="message-text" class="col-form-label">Message:</label>
                        <input type="text" class="form-control" id="tasklist" value="${taskList[index]}">
                    </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button id="edit" type="button" class="btn btn-primary">Edit Task</button>
            </div>
        </div>
    </div>`
    $("#edit").click(function (){
        let editTask = $("#tasklist").val();
        if(editTask===''){
            document.getElementById('edit').innerHTML = '<button id="edit" type="button" class="btn btn-danger">The name Task is required! Please try again! </button>'
            return;
        }
        taskList[index] = editTask;
        $('#exampleModal').modal('toggle');
        localStorage.setItem(storeageKey, JSON.stringify(taskList));
        showTaskList()
    })
}

function deleteTask(index) {
    document.getElementById('exampleModal').innerHTML = `<div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <label>Are You Sure Delete "${taskList[index]}"?</label>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
                <button id="delete" type="button" class="btn btn-danger">Yes</button>
            </div>
        </div>
    </div>`
    $('#delete').click(function () {
        taskList.splice(index,1);
        $('#exampleModal').modal('toggle');
        localStorage.setItem(storeageKey, JSON.stringify(taskList));
        showTaskList();
    })
}

function deleteAll() {
    document.getElementById('exampleModal').innerHTML = `<div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <label>Are You Sure Delete All?</label>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
                <button id="deleteall" type="button" class="btn btn-danger">Yes</button>
            </div>
        </div>
    </div>`
    $('#deleteall').click(function () {
        taskList = [];
        $('#exampleModal').modal('toggle');
        localStorage.setItem(storeageKey, JSON.stringify(taskList));
        showTaskList();
    })
}

// Search

let taskSearch =[];
function showListSearch() {
    let drawTable = '';
    for (let i = 0; i < taskSearch.length; i++) {
        let j = i +1;
        drawTable+='<tr>'+
            '<th>'+j+'</th>'+
            '<td>'+taskSearch[i]+'</td>'+
            '<td>'+'<button type="button" class="btn btn-primary" id="'+i+'" onclick="changeBtnStatus(this.id)">Not Completed</button>'+'</td>'+
            '<td>'+'<button class="btn btn-primary" onclick="editTaskSearch('+i+')" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Edit</button>'+
            '<button class="btn btn-danger" onclick="deleteTaskSearch('+i+')" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Delete</button>' +'</td>'+
            '</tr>'
    }
    console.log(drawTable)
    document.getElementById("drawTable").innerHTML = drawTable;
    document.getElementById("search").value = "";
}

function actionSearch() {
    taskSearch = [];
    let search = document.getElementById('search').value;
    let searchTLC = search.toLowerCase();
    if(search===''){
        showTaskList();
        return;
    }
    let taskListTLC = [];
    //Convert Mảng về chữ thường
    for (let i = 0; i < taskList.length; i++) {
        taskListTLC.push(taskList[i].toLowerCase())
    }
    console.log('arr taskList TLC = ', taskListTLC)
    for (let i = 0; i < taskListTLC.length; i++) {
        if(searchTLC===taskListTLC[i]){
            taskSearch.push(taskList[i]);
        }
    }
    showListSearch();
}
function editTaskSearch(index) {
    document.getElementById("exampleModal").innerHTML = `<div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">New message</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                    <div class="form-group">
                        <label for="message-text" class="col-form-label">Message:</label>
                        <input type="text" class="form-control" id="tasklistsearch" value="${taskSearch[index]}">
                    </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button id="editsearch" type="button" class="btn btn-primary">Edit Task</button>
            </div>
        </div>
    </div>`
    $("#editsearch").click(function (){
        let editTask = $("#tasklistsearch").val();
        if(editTask===''){
            document.getElementById('editsearch').innerHTML = '<button id="editsearch" type="button" class="btn btn-danger">The name Task is required! Please try again! </button>'
            return;
        }
        let indexList = taskList.indexOf(taskSearch[index]);
        taskSearch[index] = editTask;
        taskList[indexList] = editTask;
        $('#exampleModal').modal('toggle');
        localStorage.setItem(storeageKey, JSON.stringify(taskList));
        showTaskList();
    })
}
function deleteTaskSearch(index) {
    document.getElementById('exampleModal').innerHTML = `<div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <label>Are You Sure Delete "${taskSearch[index]}"?</label>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
                <button id="deletesearch" type="button" class="btn btn-danger">Yes</button>
            </div>
        </div>
    </div>`
    $('#deletesearch').click(function () {
        let indexList = taskList.indexOf(taskSearch[index]);
        taskSearch.splice(index,1);
        taskList.splice(indexList, 1);
        $('#exampleModal').modal('toggle');
        localStorage.setItem(storeageKey, JSON.stringify(taskList));
        showTaskList();
    })
}




