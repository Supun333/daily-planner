

// 1. SELECT ELEMENTS
const taskInput = document.querySelector('#taskInput');
const addTaskBtn = document.querySelector('#addTaskBtn');
const taskList = document.querySelector('#taskList');

// --- THE NEW FEATURE: READ NOTEBOOK ON OPEN ---
// When the webpage finishes loading, immediately run the "loadTasks" recipe
document.addEventListener('DOMContentLoaded', loadTasks);

// 2. THE MAIN ADD BUTTON RECIPE
function addTask() {
    const taskText = taskInput.value;

    if (taskText === "") {
        alert("Please enter a task!");
        return; 
    }

    // We moved the "plate building" into its own recipe below!
    createTaskElement(taskText, false); 
    
    // Tell the Waiter to write this new addition in his Notebook
    saveTasks(); 

    taskInput.value = ""; // Clear input
}

// 3. THE "BUILD A PLATE" RECIPE
// We separated this so we can use it when adding new tasks, AND when reading from the notebook
function createTaskElement(text, isCompleted) {
    const newTask = document.createElement('li');
    newTask.textContent = text;

    // If the notebook says this task was crossed out, add the name tag
    if (isCompleted === true) {
        newTask.classList.add('completed');
    }

    newTask.addEventListener('click', function() {
        newTask.classList.toggle('completed');
        saveTasks(); // Write in notebook: "Customer crossed this out/uncrossed it"
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.style.marginLeft = "10px"; 
    
    deleteBtn.addEventListener('click', function(event) {
        event.stopPropagation(); // Stops the click from accidentally crossing out the task
        taskList.removeChild(newTask);
        saveTasks(); // Write in notebook: "Customer threw this plate away"
    });

    newTask.appendChild(deleteBtn);
    taskList.appendChild(newTask);
}

// 4. THE NOTEBOOK WRITER (SAVE TO LOCALSTORAGE)
function saveTasks() {
    const tasksArray = []; // An empty list to hold our notebook entries
    const allTaskElements = taskList.querySelectorAll('li'); // Look at all plates on the table
    
    // Look at each plate one by one
    allTaskElements.forEach(function(taskLi) {
        // Grab just the text (ignore the delete button)
        const textOnly = taskLi.firstChild.textContent;
        // Check if it has the 'completed' name tag (true or false)
        const isCrossedOut = taskLi.classList.contains('completed');
        
        // Add this info to our list
        tasksArray.push({
            name: textOnly,
            done: isCrossedOut
        });
    });
    
    // JSON.stringify translates our list into a special text format the notebook can read
    localStorage.setItem('myTasks', JSON.stringify(tasksArray));
}

// 5. THE NOTEBOOK READER (LOAD FROM LOCALSTORAGE)
function loadTasks() {
    // Read the notebook
    const savedData = localStorage.getItem('myTasks');
    
    // If the notebook is NOT empty
    if (savedData !== null) {
        // JSON.parse translates the special text back into a list we can use
        const tasksArray = JSON.parse(savedData);
        
        // For every item in the list, tell the Waiter to build a plate!
        tasksArray.forEach(function(taskInfo) {
            createTaskElement(taskInfo.name, taskInfo.done);
        });
    }
}

// 6. CONNECT THE ADD BUTTON
addTaskBtn.addEventListener('click', addTask);