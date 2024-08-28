let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = []; // 입력된 할일을 담는 배열

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
    console.log(taskList);
    render();
    taskInput.value = "";
  }
}

function render() {
  let resultHTML = ``;
  resultHTML = `<div class="task">
            <div>${taskList[taskList.length - 1]}</div>
            <div class="button-area">
              <button>
                <i class="fa-solid fa-check"></i>
              </button>
              <button>
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>`;
  document.getElementById("task-board").insertAdjacentHTML("beforeend", resultHTML);
}
