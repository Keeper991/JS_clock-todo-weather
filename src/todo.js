const PENDING_LS = "PENDING";
const PENDING_CN = "js-pending";
const FINISHED_LS = "FINISHED";
const FINISHED_CN = "js-finished";

const taskForm = document.querySelector(".js-taskForm");
const taskInput = taskForm.querySelector("input"); // or document.querySelector(".js-taskInput");
const pendingList = document.querySelector(`.${PENDING_CN}`);
const finishedList = document.querySelector(`.${FINISHED_CN}`);

let pendingDataList = [];
let finishedDataList = [];

/* handlers */
function delBtnHandler(event) {
  const li = event.target.parentNode;
  const list = li.parentNode;

  delLocalStorageData(li.id, list.classList[1]);
  list.removeChild(li);
}

function optBtnHandler(event) {
  const li = event.target.parentNode;
  const text = li.querySelector("span").innerText;
  const id = li.id;
  const listClassName = li.parentNode.classList[1];

  delLocalStorageData(id, listClassName);

  if (listClassName === PENDING_CN) {
    pendingList.removeChild(li);
    addLiToList(text, id, FINISHED_CN);
  } else {
    finishedList.removeChild(li);
    addLiToList(text, id, PENDING_CN);
  }
}

function submitHandler(event) {
  event.preventDefault();
  const currentInputValue = taskInput.value;
  addLiToList(currentInputValue);
  taskInput.value = "";
}

/* functions */
function delLocalStorageData(id, listClassName) {
  if (listClassName === PENDING_CN) {
    pendingDataList = pendingDataList.filter(function (data) {
      return data.id !== id;
    });
    localStorage.setItem(PENDING_LS, JSON.stringify(pendingDataList));
  } else {
    finishedDataList = finishedDataList.filter(function (data) {
      return data.id !== id;
    });
    localStorage.setItem(FINISHED_LS, JSON.stringify(finishedDataList));
  }
}

function addLiToList(text, id = null, listClassName = PENDING_CN) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const optBtn = document.createElement("button");
  const span = document.createElement("span");

  delBtn.innerText = "❌";
  delBtn.addEventListener("click", delBtnHandler);

  listClassName === PENDING_CN
    ? (optBtn.innerText = "✅")
    : (optBtn.innerText = "⏪");
  optBtn.addEventListener("click", optBtnHandler);
  span.innerText = text;

  id === null ? (li.id = Date.now()) : (li.id = id);
  li.appendChild(delBtn);
  li.appendChild(optBtn);
  li.appendChild(span);

  const newTask = {
    id: li.id,
    text,
  };

  if (listClassName !== FINISHED_CN) {
    pendingList.appendChild(li);
    pendingDataList.push(newTask);
    localStorage.setItem(PENDING_LS, JSON.stringify(pendingDataList));
  } else {
    finishedList.appendChild(li);
    finishedDataList.push(newTask);
    localStorage.setItem(FINISHED_LS, JSON.stringify(finishedDataList));
  }
}

function loadListsFromLS() {
  const pendingLS = localStorage.getItem(PENDING_LS);
  const finishedLS = localStorage.getItem(FINISHED_LS);

  if (pendingLS !== null) {
    const parsedPending = JSON.parse(pendingLS);
    parsedPending.forEach(function (data) {
      addLiToList(data.text, data.id);
    });
  }

  if (finishedLS !== null) {
    const parsedFinished = JSON.parse(finishedLS);
    parsedFinished.map((data) => {
      return addLiToList(data.text, data.id, FINISHED_CN);
    });
  }
}

/* init */
function initTodo() {
  loadListsFromLS();
  taskForm.addEventListener("submit", submitHandler);
}

initTodo();
