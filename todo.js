"use strict";

let tasks = [];

const tasksList = document.getElementById("list");
const addTaskInput = document.getElementById("add");
const taskCounter = document.getElementById("tasks-counter");

function addDomTask(task, taskCount) {
  let list = document.createElement("li");
  list.innerHTML = `
  <input
  type="checkbox"
  id="task-${taskCount}"
  data-task-id="${task.id}"
  class="custom-checkbox" ${task.done ? "checked" : ""}/>
  <label for="task-${taskCount}">${task.text}</label>
  <div class="delete-task" data-task-id=${task.id}>
    <i class="fa-solid fa-trash"></i>
  </div>
  `;
  tasksList.append(list);
  taskCounter.innerHTML = tasks.length;
}
/*
    Created By: @Aman shinde
    Date: 28/03/2023
    Render the task List   
 */
function renderList() {
  tasksList.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    addDomTask(tasks[i], i + 1);
  }
}

/*
    Created By: @Aman shinde
    Date: 28/03/2023
    Marked the task as completed    
 */
function markTaskAsCompleted(taskId) {
  let task = tasks.filter((task) => {
    return task.id === taskId;
  });

  if (task.length > 0) {
    task[0]["done"] = true;
    renderList();
    showNotification("Task Completed Successfully.");
  } else {
    showNotification("Error! Unable To Add Task To Completed.");
  }
}

/*
    Created By: @Aman shinde
    Date: 28/03/2023
    Delete the task in tasks array    
 */
function deleteTask(taskId) {
  let newTasks = tasks.filter((task) => {
    return task.id !== taskId;
  });
  tasks = newTasks;
  renderList();
  showNotification("Task Deleted Successfully.");
}

/*
    Created By: @Aman shinde
    Date: 28/03/2023
    Add the task in tasks array
*/
function addTask(task) {
  if (task) {
    tasks.push(task);
    renderList();
    showNotification("Task Added Successfully.");
  } else {
    showNotification("Error! Unable To Add Task.");
  }
}

/*
    Created By: @Aman shinde
    Date: 28/03/2023
    Show the notification    
 */
function showNotification(text) {
  alert(text);
}

function handleInputKeyPress(e) {
  if (e.key === "Enter") {
    let text = e.target.value;

    if (!text) {
      showNotification("Task cannot be empty.");
      return;
    }

    const taskList = {
      text: text,
      id: Date.now().toString(),
      done: false,
    };
    addTask(taskList);
    e.target.value = "";
  }
}

function handleClickEvent(e) {
  let target = e.target;
  console.log(target);
  console.log(target.dataset);
  let className = target.className;
  switch (className) {
    case "custom-checkbox":
      markTaskAsCompleted(target.dataset.taskId);
      break;
    case "delete-task":
      deleteTask(target.dataset.taskId);
      break;
    default:
      return;
  }
}

addTaskInput.addEventListener("keyup", handleInputKeyPress);
document.addEventListener("click", handleClickEvent);
