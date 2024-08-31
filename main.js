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
    // 입력한 내용과 완료여부를 체크하는 내용 포함
    let task = {
      id: generateRandomID(),
      taskContent: taskInput.value,
      isComplete: false,
      isDeleted: false,
    };
    console.log(task);
    taskList.push(task);
    render();
    taskInput.value = ""; // 입력창 비우기
  }
}

function render() {
  let resultHTML = ``;
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].isDeleted == true) {
      resultHTML += "";
    } else {
      if (taskList[i].isComplete == true) {
        resultHTML += `<div class="task task-box-done">
      <div class = "task-done">${taskList[i].taskContent}</div>
      <div class="button-area">
        <button onclick = "toggleComplete('${taskList[i].id}')">
          <i class="fa-solid fa-check"></i>
        </button>
        <button onclick = "deleteTask('${taskList[i].id}')">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>`;
      } else {
        resultHTML += `<div class="task">
        <div>${taskList[i].taskContent}</div>
        <div class="button-area">
          <button onclick = "toggleComplete('${taskList[i].id}')">
            <i class="fa-solid fa-check"></i>
          </button>
          <button onclick = "deleteTask('${taskList[i].id}')">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>`;
      }
    }
  }
  taskBoard.innerHTML = resultHTML;
}

// 체크 버튼이 클릭되었을 때 실행
function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break; // for 문 종료
    }
  }
  render(); // 화면에 그리기 위해 render 함수 호출
}

function deleteTask(id) {
  console.log("삭제");
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isDeleted = true;
      break;
    }
  }
  console.log(taskList);
  render(); // 화면에 그리기 위해 render 함수 호출
}

// task 의 id 생성
function generateRandomID() {
  return Math.random().toString(36).substr(2, 16);
}
