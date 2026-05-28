const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskList = document.getElementById("taskList");

function addTask() {
    const taskText = taskInput.value.trim();
    const dateValue = taskDate.value;


//Popup message if there's no input
if (taskText === "" || dateValue === "") {
    alert("Please enter task and date.");
    return;
}

//create task
const li = document.createElement("li");

li.innerHTML = `
<div class="task-top">
    <span class="task-text">${taskText}</span>
    <span class="star">☆</span>
</div>

<div class="date">${dateValue}</div>

<div class="task-bottons">
    <button class="edit-btn">Edit</button>
    <button class="update-btn" style="display:none;">Update</button>
    <button class="delete-btn">Delete</button>
</div>
`;

//add task to list
taskList.appendChild(li);

//clear input 
taskInput.value = "";
taskDate.value = "";

//delete button
const deleteBtn = li.querySelector(".delete-btn");

deleteBtn.addEventListener("click", function() {
    li.remove();
});

}
