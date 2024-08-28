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
  taskList.push(taskInput.value);
  console.log(taskList);
  render();
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
  document.getElementById("task-board").innerHTML = resultHTML;
}
