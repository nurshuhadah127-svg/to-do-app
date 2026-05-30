const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskList = document.getElementById("taskList");

function addTask() {
    const taskText = taskInput.value.trim();
    const dateValue = taskDate.value;

    // Alert message if there's no input
    if (taskText === "" || dateValue === "") {
        alert("Please enter task and date.");
        return;
    }

    // create task
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

    // add task to list
    taskList.appendChild(li);

    // popup selepas tambah task
    alert("Task Added Successfully!");

    // reminder berdasarkan tarikh
    const today = new Date();
    const dueDate = new Date(dateValue);

    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
        alert(`Reminder: "${taskText}" is due tomorrow!`);
    }

    // clear input
    taskInput.value = "";
    taskDate.value = "";

    // delete button
    const deleteBtn = li.querySelector(".delete-btn");

    deleteBtn.addEventListener("click", function() {
        li.remove();
    });

    // edit & update button
    const editBtn = li.querySelector(".edit-btn");
    const updateBtn = li.querySelector(".update-btn");

    const taskTextSpan = li.querySelector(".task-text");
    const dateDiv = li.querySelector(".date");

    // edit task
    editBtn.addEventListener("click", function() {

        taskInput.value = taskTextSpan.textContent;
        taskDate.value = dateDiv.textContent;

        editBtn.style.display = "none";
        updateBtn.style.display = "inline-block";
    });

    // update task
    updateBtn.addEventListener("click", function() {

        const newTask = taskInput.value.trim();
        const newDate = taskDate.value;

        if (newTask === "" || newDate === "") {
            alert("Please enter task and date.");
            return;
        }

        taskTextSpan.textContent = newTask;
        dateDiv.textContent = newDate;

        taskInput.value = "";
        taskDate.value = "";

        editBtn.style.display = "inline-block";
        updateBtn.style.display = "none";

        alert("Task Updated Successfully!");
    });
}
