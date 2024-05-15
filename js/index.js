// ! CRUD !
// ^HTML element^
var signupname = document.querySelector("#userName");
var signupEmail = document.querySelector("#signupEmail");
var signupPassword = document.querySelector("#signupPassword");
var signinEmail = document.querySelector("#signinEmail");
var signinPassword = document.querySelector("#signinPassword");
var btn = document.querySelector("button");
var success = document.querySelector(".success");
var exist = document.querySelector(".exist");
var incorrect = document.querySelector(".incorrect");
var link = document.querySelector(".link");
var fault = document.querySelector(".fault");
var welcome = document.querySelector(".welcome");
// *App variables*

var emailRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{3,}$/gm;
var passwordRegex = /^((?=\S*?[a-z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/;

var userArray = [];
if (localStorage.getItem("clients") == null) {
  userArray = [];
} else {
  userArray = JSON.parse(localStorage.getItem("clients"));
}
// & functions &
function Validate(regex, element) {
  if (regex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    return false;
  }
}
function emailExist() {
  for (var i = 0; i < userArray.length; i++) {
    if (userArray[i].email.toLowerCase() == signupEmail.value.toLowerCase())
      return false;
  }
}
function signUp() {
  console.log("sign up tmm");
  var signUp = {
    name: signupname.value,
    email: signupEmail.value,
    password: signupPassword.value,
  };
  if (emailExist() == false) {
    exist.classList.remove("d-none");
  } else {
    userArray.push(signUp);
    localStorage.setItem("clients", JSON.stringify(userArray));
    success.classList.remove("d-none");
  }
}

function loginEmpty() {
  if (signinEmail.value == "" || signinPassword.value == "") {
    return false;
  }
}

function login() {
  if (loginEmpty() == false) {
    incorrect.classList.remove("d-none");
    return false;
  } else {
    for (var i = 0; i < userArray.length; i++) {
      if (
        userArray[i].email.toLowerCase() == signinEmail.value.toLowerCase() &&
        userArray[i].password.toLowerCase() ==
          signinPassword.value.toLowerCase()
      ) {
        localStorage.setItem("clientName", userArray[i].name);
        link.setAttribute("href", "welcome.html");
        console.log("login done");
      } else {
        fault.classList.remove("d-none");
      }
    }
  }
}
var username = localStorage.getItem("clientName");
if (username) {
  document.getElementById("username").innerHTML =
    "Student Name" + ":  " + username;
}
// function welcome() {
//   welcome.innerHTML = localStorage.getItem("clientName");
// }

// ~ Events ~
