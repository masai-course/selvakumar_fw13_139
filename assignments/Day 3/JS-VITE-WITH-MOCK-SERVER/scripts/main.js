// --- do not touch  ↓↓↓↓↓↓↓↓↓↓↓↓ ----------
const baseServerURL = `http://localhost:${import.meta.env.REACT_APP_JSON_SERVER_PORT
  }`;
// --- do not touch  ↑↑↑↑↑↑↑↑↑↑↑↑ ----------


const userLoginURL = `${baseServerURL}/login`;
const urlTodos = `${baseServerURL}/todos/`;

let mainSection = document.getElementById("data-list-wrapper");
let notificationWrapper = document.getElementById("notifications-wrapper");

let loginUserUsername = document.getElementById("login-user-username");
let loginUserPassword = document.getElementById("login-user-password");
let loginUserButton = document.getElementById("login-user");

let getTodoButton = document.getElementById("fetch-todos");

let sortLowToHigh = document.getElementById("sort-low-to-high");
let sortHighToLow = document.getElementById("sort-high-to-low");
let filterCompleted = document.getElementById("filter-completed");
let filterPending = document.getElementById("filter-pending");

let todoArray = [];
let ourAccessToken = localStorage.getItem("token") || [];
let dataListWrapper = document.getElementById("todo-list-wrapper");

let notificationCont = document.getElementById("notifications-wrapper")

loginUserButton.addEventListener("click", loginUser)

async function loginUser() {
  try {
    let obj = {
      username: loginUserUsername.value,
      password: loginUserPassword.value,
    }

    let userLogin = await fetch(userLoginURL, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify(obj),
    })
    let data = await userLogin.json()
    localStorage.setItem("token",data.accessToken)
    loginNotification()
  }
  catch (error) {
    console.log(error)
  }
}
function loginNotification() {
  notificationCont.innerHTML = `
  <h5 class = "notification info">
  hey ${loginUserUsername.value}, welcome back! 
  `
}
getTodoButton.addEventListener("click", fetchTodo)
async function fetchTodo() {
  try {
    let todoFetch = await fetch(urlTodos, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${ourAccessToken}`
      }
    })
    let data = await todoFetch.json()
    showTodoList(data)
    todoArray = data;
  } catch (error) {
    console.log(error)
  }

}

function showTodoList(data) {
  let todoList = `
  <div class="todo-item-label" id="todo-list-wrapper">
  ${data.map((item) => {
    return label(item.id, item.completed, item.title)
  }).join("")}
  </div>
  `
  dataListWrapper.innerHTML = todoList;
}

function label(id, completed, title) {
  let flag = ""
  if (completed)
    flag = "checked"
  else
    flag = ""

  let label1 = ` 
    <label class = "todo-item-label">
    <input class = "todo-item-checkbox" data-id = ${id} type = "checkbox" ${flag}>
    ${title}
    </label>
  `
  console.log(label1)
  return label1
}

sortHighToLow.addEventListener("click",sortAsc)
async function sortAsc(){
  try{
    let todoFetch = await fetch (`${urlTodos}?_sort=title&_order='asc'`,{
      method : 'GET',
      headers : {
        Authorization : `Bearer ${ourAccessToken}`
      }
    })
    let data = await todoFetch.json()
    showTodoList(data)
  }
  catch(error){
    console.log(error)
  }
}

sortHighToLow.addEventListener("click",sortDsc)

async function sortDsc(){
  try{
    let todoFetch = await fetch (`${urlTodos}?_sort=title&_order='desc'`,{
      method : 'GET',
      headers : {
        Authorization : `Bearer ${ourAccessToken}`
      },
    })
    let data = await todoFetch.json()
    showTodoList(data)
  }
  catch(error){
    console.log(error)
  }
}

