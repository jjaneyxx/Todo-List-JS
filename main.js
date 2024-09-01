let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = []; // 입력된 할일을 담는 배열
let taskBoard = document.getElementById("task-board");
let tabs = document.querySelectorAll(".tabs div");
let mode = "all"; // 유저가 선택한 탭의 id
let filterList = []; // 진행중인 아이템만 담는 새로운 배열

addButton.addEventListener("click", addTask);
taskInput.addEventListener("focus", () => {
  taskInput.value = "";
});
taskInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") addTask();
});

tabs.forEach((tab, index) => {
  if (index > 0) {
    tab.addEventListener("click", function (event) {
      filter(event);
    });
  }
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
    filter({ target: { id: mode } });
    taskInput.value = ""; // 입력창 비우기
  }
}

function render() {
  let list = [];
  if (mode === "all") {
    list = taskList;
  } else if (mode === "ongoing" || mode === "done") {
    list = filterList;
  }

  let resultHTML = ``;
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<div class="task task-box-done">
      <div class = "task-done">${list[i].taskContent}</div>
      <div class="button-area">
        <button onclick = "toggleComplete('${list[i].id}')">
          <i class="fa-solid fa-arrow-rotate-right"></i>
        </button>
        <button onclick = "deleteTask('${list[i].id}')">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>`;
    } else {
      resultHTML += `<div class="task">
        <div>${list[i].taskContent}</div>
        <div class="button-area">
          <button onclick = "toggleComplete('${list[i].id}')">
            <i class="fa-solid fa-check"></i>
          </button>
          <button onclick = "deleteTask('${list[i].id}')">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>`;
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
  filter({ target: { id: mode } }); // 화면에 그리기 위해 render 함수 호출
}

function deleteTask(id) {
  console.log("삭제");
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  console.log(taskList);
  filter({ target: { id: mode } }); // 화면에 그리기 위해 render 함수 호출
}

// 모두, 진행중, 끝남 탭 필터링
function filter(event) {
  mode = event.target.id;
  if (mode === "all") {
    // 모두 탭 선택
    render();
  } else if (mode === "ongoing") {
    // 진행중 탭 선택
    filterList = []; // 필터 리스트를 우선 초기화
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]); // 진행중인 아이템만 푸쉬
      }
    }
    console.log("진행중 탭", filterList);
    render();
  } else if (mode === "done") {
    // 끝남 탭 선택
    filterList = [];
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
      }
    }
    console.log("끝남 탭", filterList);
    render();
  }
}

// task 의 id 생성
function generateRandomID() {
  return Math.random().toString(36).substr(2, 16);
}
