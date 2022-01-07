let signs = [
  "CE",
  "C",
  "+/-",
  "+",
  "1",
  "2",
  "3",
  "-",
  "4",
  "5",
  "6",
  "*",
  "7",
  "8",
  "9",
  "/",
  "💡",
  "0",
  ".",
  "=",
];
let input = document.getElementById("enter");
let outputNum = document.getElementById("outputNum");
let outputSign = document.getElementById("outputSign");
let operator = "";
let result = "";
let body = document.querySelector("body");
let keyboard = document.getElementById("keyboard");
let theme = localStorage.getItem("theme") || "light";

setTheme();

signs.forEach((sign) => {
  let button = document.createElement("button");  
  button.className = "button border";
  button.innerHTML = sign;
  keyboard.appendChild(button);  
  button.addEventListener("click", onButtonClick);
});

document.querySelector('#enter').addEventListener('input', function(){
    this.value = this.value.replace(/[^0-9]/g, '');	
    if (this.value.length > 20) this.value = this.value.slice(0, 20);
});

const isMobile = /Mobile|webOS|BlackBerry|IEMobile|MeeGo|mini|Fennec|Windows Phone|Android|iP(ad|od|hone)/i.test(navigator.userAgent);
if (isMobile) input.setAttribute('readonly', 'readonly')

input.addEventListener('keydown', function(event) {
	event.preventDefault();
	let key = "";
	switch(event.key) {
		case "Enter":
			key = "=";
			onButtonClick(key);
			break;
		case ".":
		case ",":
		key = ".";
		onButtonClick(key);
		break;
		case "Backspace":
			key = "C";
			onButtonClick(key);
			break;
		case "Escape":	
		case "Delete":
			key = "CE";
			onButtonClick(key);
			break;
		case "1":
		case "2":
		case "3":
		case "4":
		case "5":
		case "6":
		case "7":
		case "8":
		case "9":
		case "0":
		case "+":
		case "-":
		case "*":
		case "/":
		case "=":
			key = event.key;
			onButtonClick(key);
			break;
	}
});

function onButtonClick(event) {
	let num = "";
	if(typeof event === "string") {
		num = event;
		} else {
		num = event.target.innerHTML;}
  switch (num) {
    case "CE":
      input.value = "";
      operator = "";
      result = "";
      outputNum.textContent = "";
      outputSign.textContent = "";
      break;
    case "C":
      input.value = +input.value.slice(0, input.value.length - 1);
      break;
    case ".":
      if (!isInteger(input.value)) break;
	  if (input.value === "-"){
		  input.value = "-0."
		  break;
	  }
      if (input.value === "") {
          input.value = "0.";
          break;
      }
      input.value += ".";
      break;
    case "+":
      if (input.value !== "") {		
        result = equal(result, input.value);
        operator = "+";
        doAfterCalc();
      }
      break;
    case "-":
	  if (input.value === "-"){
		  input.value = "";
		  break;
	  }
      if (input.value !== "") {
        result = equal(result, input.value);
        operator = "-";
        doAfterCalc();
      } else {
		input.value = "-";
		break;
	  }
      break;
    case "*":
      if (input.value !== "") {
        result = equal(result, input.value);
        operator = "*";
        doAfterCalc();
      }
      break;
    case "/":
      if (input.value !== "") {
        result = equal(result, input.value);
        operator = "/";
        doAfterCalc();
      }
      break;
	 case "+/-":
      if (input.value === ("" || 0)) break;      
      input.value *= -1;
      break;
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case "0":
      if (input.value.length > 20)
        input.value = input.value.slice(0, 20);
      input.value += +num;
      break;
    case "💡":
      switchTheme();
      setTheme();
      break;
    case "=":
      if (input.value !== "") {
        input.value = equal(result, input.value);
        result = "";
        operator = "";
		outputSign.textContent = "";
		outputNum.textContent = "";
      }
  }
}

	

function equal(first, second) {
	if (second === ("-" || "" || "0.")) {second = "0";}
    if (first === "") return +second;
	first = +first;
	second = +second;
  switch (operator) {
    case "+":
      return first + second;
    case "-":
      return first - second;
    case "*":
      return first * second;
    case "/":
      if (second === 0) {
        input.value = "";
        outputSign.textContent = "";
        outputNum.textContent = "";
		alert("Ошибка! Деление на 0!");
        return "";
      } else return first / second;
    case "":
      return second;
  }
}
function isInteger(num) {
  return num.indexOf(".") === -1;
}
function doAfterCalc() {
  input.value = "";
  outputSign.textContent = operator;
  outputNum.textContent = result;
}
function switchTheme() {
  if (theme === "dark") {
    theme = "light";
    localStorage.setItem("theme", "light");
  } else {
    theme = "dark";
    localStorage.setItem("theme", "dark");
  }
}
function setTheme() {
  if (theme === "dark") {
    body.style.setProperty("--body-color", "darkgrey");
    body.style.setProperty("--calc-color", "grey");
  } else {
    body.style.setProperty("--body-color", "whitesmoke");
    body.style.setProperty("--calc-color", "darkgrey");
  }
}
