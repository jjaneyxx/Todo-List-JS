let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = []; // 입력된 할일을 담는 배열
let taskBoard = document.getElementById("task-board");

addButton.addEventListener("click", addTask);
taskInput.addEventListener("focus", () => {
  taskInput.value = "";
});
taskInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") addTask();
});

function addTask() {
  if (taskInput.value == "") {
    alert("할 일을 입력하세요");
  } else {
    taskList.push(taskInput.value);
    render();
    taskInput.value = "";
  }
}

function render() {
  let resultHTML = ``;
  for (let i = 0; i < taskList.length; i++) {
    resultHTML += `<div class="task">
    <div>${taskList[i]}</div>
    <div class="button-area">
      <button>
        <i class="fa-solid fa-check"></i>
      </button>
      <button>
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  </div>`;
  }
  taskBoard.innerHTML = resultHTML;
}
