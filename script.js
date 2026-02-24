// 1. SELECT ELEMENTS
const taskInput = document.querySelector('#taskInput');
const addTaskBtn = document.querySelector('#addTaskBtn');
const taskList = document.querySelector('#taskList');

// 2. DEFINE THE FUNCTION
function addTask() {
    const taskText = taskInput.value;

    if (taskText === "") {
        alert("Please enter a task!");
        return; 
    }

    const newTask = document.createElement('li');
    newTask.textContent = taskText;

    // --- NEW LIGHT SWITCH INSTRUCTION ---
    newTask.addEventListener('click', function() {
        newTask.classList.toggle('completed');
    });
    // ------------------------------------

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.style.marginLeft = "10px"; 
    
    deleteBtn.addEventListener('click', function() {
        taskList.removeChild(newTask);
    });

    newTask.appendChild(deleteBtn);
    taskList.appendChild(newTask);
    taskInput.value = "";
}

// 3. ADD EVENT LISTENER TO THE MAIN BUTTON
addTaskBtn.addEventListener('click', addTask);