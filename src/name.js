const USERNAME_LS = "USERNAME";
const USERNAME_CN = "js-username";
const USERFORM_CN = "js-userform";

const user = document.querySelector(`.${USERNAME_CN}`);
const userForm = document.querySelector(`.${USERFORM_CN}`);
const userInput = userForm.querySelector("input");

function saveUserName(name) {
  localStorage.setItem(`${USERNAME_LS}`, name);
}

function printUserName(name) {
  user.innerText = `Hi, ${name}.`;
}

function userNameHandler(event) {
  event.preventDefault();
  const value = userInput.value;
  saveUserName(value);
  printUserName(value);
}

function loadUserName() {
  const currentUser = localStorage.getItem(`${USERNAME_LS}`);
  if (currentUser !== null) {
    printUserName(currentUser);
  }
}

function initName() {
  loadUserName();
  userForm.addEventListener("submit", userNameHandler);
}

initName();
