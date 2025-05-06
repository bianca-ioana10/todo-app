// Select elements
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

// Load tasks from localStorage on page load
window.addEventListener("load", loadTasks);

// Add task on button click
addTaskBtn.addEventListener("click", addTask);

// Function to add a task
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
      }
    
      const task = {
        text: taskText,
        completed: false
      };
    
      const taskElement = createTaskElement(task);
      taskList.appendChild(taskElement);
      saveTaskToLocalStorage(task);
      taskInput.value = "";
    }
    
    // Function to create a task <li> element
    function createTaskElement(task) {
      const li = document.createElement("li");
      li.textContent = task.text;
    
      if (task.completed) {
        li.classList.add("completed");
      }
    
      li.addEventListener("click", () => {
        li.classList.toggle("completed");
        task.completed = !task.completed;
        updateTasksInLocalStorage();
      });
    
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.style.marginLeft = "10px";
      deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        li.remove();
        removeTaskFromLocalStorage(task.text);
      });
    
      li.appendChild(deleteBtn);
      return li;
    }
    
    // Save a task to localStorage
    function saveTaskToLocalStorage(task) {
      const tasks = getTasksFromLocalStorage();
      tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    
    // Get tasks from localStorage
    function getTasksFromLocalStorage() {
      return JSON.parse(localStorage.getItem("tasks")) || [];
    }
    
    // Update all tasks in localStorage
    function updateTasksInLocalStorage() {
      const tasks = [];
      taskList.querySelectorAll("li").forEach(li => {
        const text = li.childNodes[0].nodeValue;
        const completed = li.classList.contains("completed");
        tasks.push({ text, completed });
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    
    // Remove a task from localStorage
    function removeTaskFromLocalStorage(taskText) {
      let tasks = getTasksFromLocalStorage();
      tasks = tasks.filter(task => task.text !== taskText);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    
    // Load tasks and display them
    function loadTasks() {
      const tasks = getTasksFromLocalStorage();
      tasks.forEach(task => {
        const li = createTaskElement(task);
        taskList.appendChild(li);
      });
    }