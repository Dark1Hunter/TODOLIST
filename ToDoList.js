//Variables
import "./ToDoList.css";
import accept from "./Images/accept.png";
import radio from "./Images/radio.png";
console.log(accept);
const parent = document.querySelector(".parent");
const createBtn = document.querySelector(".create-button");
const task = document.querySelector(".textBox");
const textHolder = document.querySelector(".parent-List");
let localData = JSON.parse(localStorage.getItem("tasks") || "[]");
let img = "Images/radio.png";
let checkSit = JSON.parse(localStorage.getItem("check") || "[]");

const updateNumbering = function (Allplans) {
  const plans = textHolder.querySelectorAll(`${Allplans}`);
  plans.forEach((plan, index) => {
    const text = plan.textContent.trim().replace(/^\d+-/, "");
    plan.textContent = `${index + 1}-${text}`;
  });
};
const getBackData = function () {
  const data = JSON.parse(localStorage.getItem("check") || "[]");
  console.log(data);
  textHolder.innerHTML = "";
  localData.forEach((plan, index) => {
    console.log(data[index]);

    textHolder.innerHTML += `<div class='line1 line'>
    <li class="plan" ${
      checkSit[index] === 1
        ? 'style = "text-decoration: line-through; text-decoration-thickness: 2px;"'
        : ""
    }>
    ${index + 1}-${plan}
    </li>
    <img class="checkpoint" src="${
      data[index] === 1 ? `${accept}` : `${radio}`
    }"/>
    
    <button class="remove-button">Remove</button>
    </div>
    `;
  });
};
getBackData();

//Data
let removeBtn;

// parent.addEventListener("click", function (e) {
//   console.log();
//   if (e.target.classList[0] == "create-button") {
//     removeBtn = e.target.closest(".parent").querySelector(".line1");
//   }
// });

const addTask = function () {
  if (task.value === "") {
    alert("Please write a task");
  } else {
    const markup = `    
<div class='line1 line'>
<li class="plan">
${localData.length + 1}-${task.value}
</li>
<img class="checkpoint" src="${radio}"/>
<button class="remove-button">Remove</button>
</div>
`;

    textHolder.innerHTML += markup;
    // textHolder.insertAdjacentHTML("beforeend", markup);
    localData.push(task.value);
    checkSit.push(0);
    localStorage.setItem("tasks", JSON.stringify(localData));
    localStorage.setItem("check", JSON.stringify(checkSit));
    task.value = "";
  }
  console.log(removeBtn);
};

createBtn.addEventListener("click", addTask);

//Delete Element
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("remove-button")) {
    e.preventDefault();
    console.log("clicked");
    const lineTodelete = e.target.closest(".line");
    //Update

    const lineText = lineTodelete
      .querySelector(".plan")
      .textContent.trim()
      .split("-")[1];
    const index = localData.indexOf(lineText);
    console.log(lineText);
    console.log(index);

    if (index !== -1) {
      lineTodelete.remove();
      checkSit.splice(index, 1);
      localData.splice(index, 1);
      console.log(lineText);
      console.log(localData.indexOf(lineText));
      localData = localData.filter((t) => t.trim() !== lineText);
      localStorage.setItem("tasks", JSON.stringify(localData));
      localStorage.setItem("check", JSON.stringify(checkSit));
      updateNumbering(".plan");
    }
  }
});
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("checkpoint")) {
    const checkbox = e.target;
    const line = checkbox.closest(".line");
    const lineText = line
      .querySelector(".plan")
      .textContent.trim()
      .replace(/^\d+-/, "");
    const index = localData.indexOf(lineText);
    console.log(index);
    // Check the current src of the image
    if (checkbox.src.includes(`${radio}`)) {
      console.log(checkbox);
      checkSit[index] = 1;
      line.querySelector(".plan").style.textDecoration = "line-through";
      line.querySelector(".plan").style.textDecorationThickness = "2px";

      checkbox.src = `${accept}`;
    } else if (checkbox.src.includes(`${accept}`)) {
      console.log(checkbox);
      checkSit[index] = 0;
      line.querySelector(".plan").style.textDecoration = "none";

      checkbox.src = `${radio}`;
    }
  }
  localStorage.setItem("check", JSON.stringify(checkSit));
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});
alert("Hacked");
