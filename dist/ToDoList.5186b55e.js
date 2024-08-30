// Function to load an image
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// Function to handle localStorage operations
function getLocalStorageItem(key, defaultValue = "[]") {
  return JSON.parse(localStorage.getItem(key) || defaultValue);
}

function setLocalStorageItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Initialize task list
function initializeTaskList() {
  const taskList = getLocalStorageItem("tasks");
  const checkList = getLocalStorageItem("check");
  const listContainer = document.querySelector(".parent-List");
  const taskTemplate = (task, index, isChecked) => `
    <div class="line1 line">
      <li class="plan" style="${
        isChecked
          ? "text-decoration: line-through; text-decoration-thickness: 2px;"
          : ""
      }">
        ${index + 1}- ${task}
      </li>
      <img class="checkpoint" src="${isChecked ? acceptImgSrc : radioImgSrc}" />
      <button class="remove-button">Remove</button>
    </div>
  `;

  listContainer.innerHTML = taskList
    .map((task, index) => taskTemplate(task, index, checkList[index]))
    .join("");
}

function addTask() {
  const taskInput = document.querySelector(".textBox");
  const taskList = getLocalStorageItem("tasks");
  const checkList = getLocalStorageItem("check");

  if (taskInput.value.trim() === "") {
    alert("Please write a task");
    return;
  }

  taskList.push(taskInput.value);
  checkList.push(0);
  setLocalStorageItem("tasks", taskList);
  setLocalStorageItem("check", checkList);

  const listContainer = document.querySelector(".parent-List");
  listContainer.innerHTML += `
    <div class="line1 line">
      <li class="plan">${taskList.length}- ${taskInput.value}</li>
      <img class="checkpoint" src="${radioImgSrc}" />
      <button class="remove-button">Remove</button>
    </div>
  `;
  taskInput.value = "";
}

function handleTaskClick(event) {
  const target = event.target;
  const listContainer = document.querySelector(".parent-List");
  const taskList = getLocalStorageItem("tasks");
  const checkList = getLocalStorageItem("check");

  if (target.classList.contains("remove-button")) {
    event.preventDefault();
    const line = target.closest(".line");
    const taskText = line
      .querySelector(".plan")
      .textContent.trim()
      .split("- ")[1];
    const index = taskList.indexOf(taskText);

    if (index !== -1) {
      line.remove();
      taskList.splice(index, 1);
      checkList.splice(index, 1);
      setLocalStorageItem("tasks", taskList);
      setLocalStorageItem("check", checkList);
      initializeTaskList(); // Refresh list
    }
  } else if (target.classList.contains("checkpoint")) {
    const img = target;
    const line = img.closest(".line");
    const taskText = line
      .querySelector(".plan")
      .textContent.trim()
      .split("- ")[1];
    const index = taskList.indexOf(taskText);
    if (index !== -1) {
      if (img.src.includes(radioImgSrc)) {
        checkList[index] = 1;
        line.querySelector(".plan").style.textDecoration = "line-through";
        img.src = acceptImgSrc;
      } else {
        checkList[index] = 0;
        line.querySelector(".plan").style.textDecoration = "none";
        img.src = radioImgSrc;
      }
      setLocalStorageItem("check", checkList);
    }
  }
}

document.querySelector(".create-button").addEventListener("click", addTask);
document.addEventListener("click", handleTaskClick);
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

// Load images
const radioImgSrc = "/radio.fe384e3f.png";
const acceptImgSrc = "/accept.8305f52f.png";

Promise.all([loadImage(radioImgSrc), loadImage(acceptImgSrc)])
  .then(() => {
    initializeTaskList();
  })
  .catch((error) => {
    console.error("Error loading images:", error);
  });
console.log("Test");
