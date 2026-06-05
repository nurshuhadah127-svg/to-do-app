const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskList = document.getElementById("taskList");

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

        <span class="task-text">${taskText}</span> 
        
        <span class="star-icon">☆</span>

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
        } else {
            star.textContent = "☆";
        }
    });

    // edit task
    editBtn.addEventListener("click", function() {

        // Sends the text back up to the main input fields
        taskInput.value = taskTextSpan.textContent;
        taskDate.value = taskDateSpan.textContent.replace("📅", "");

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

        alert("Task Updated Successfully!");
    });
}
