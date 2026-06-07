const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskList = document.getElementById("taskList");
const addButton = document.querySelector(".input-section button");
let editingTask = null;

//add task
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
        <button class="delete-btn">Delete 🗑️</button>

        <div class="task-header">
        <span class="task-text">${taskText}</span> 
        <span class="star-icon">☆</span>
        </div>

        <span class="task-date">📅 ${dateValue}</span>

    <div class="action-buttons">
        <button class="edit-btn">Edit</button>
        <button class="update-btn" style="display:none;">Update</button>
    </div>
    `;

    // add task to list
    taskList.appendChild(li);

    setupTaskFeatures(li);

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

}

    // task feature
    function setupTaskFeatures(li) {

    const deleteBtn = li.querySelector(".delete-btn");
    const editBtn = li.querySelector(".edit-btn");
    const updateBtn = li.querySelector(".update-btn");
    const taskTextSpan = li.querySelector(".task-text");
    const taskDateSpan = li.querySelector(".task-date");
    const star = li.querySelector(".star-icon");

    //delete
    deleteBtn.addEventListener("click", function() {
        if (confirm("Delete this task?")){
            li.remove();
        }
    });

    //star task
    star.addEventListener("click", function() {
        if (star.textContent === "☆") {
            star.textContent = "⭐";

            taskList.prepend(li);

        } else {
            star.textContent = "☆";

            taskList.appendChild(li);
        }
    });

    // edit task
    editBtn.addEventListener("click", function() {

        //if theres other task being edited
        if (editingTask !== null){
            alert("Please finish updating the current task first!");
            return;
        }

        editingTask = li;

        // Sends the text back up to the main input fields
        taskInput.value = taskTextSpan.textContent;
        taskDate.value = taskDateSpan.textContent.replace("📅", "").trim();

        addButton.style.display = "none";

        editBtn.style.display = "none";
        updateBtn.style.display = "inline-block";
    });

    // update task
    updateBtn.addEventListener("click", function() {
        // Grabs the newly typed text from the main input fields
        const newTask = taskInput.value.trim();
        const newDate = taskDate.value;

        if (newTask === "" || newDate === "") {
            alert("Please enter task and date.");
            return;
        }

        // Updates the list item
        taskTextSpan.textContent = newTask;
        taskDateSpan.textContent = "📅 " + newDate;

        // Clears the input fields again
        taskInput.value = "";
        taskDate.value = "";

        editBtn.style.display = "inline-block";
        updateBtn.style.display = "none";

        addButton.style.display = "inline-block";

        editingTask = null;

        alert("Task Updated Successfully!");
    });
}
