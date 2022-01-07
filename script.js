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
let number = "";
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

input.addEventListener('keyup', function(event) {
	let key = "";
	console.log(event.key);
	switch(event.key) {
		case "+":
			key = "+";
			onButtonClick(key);
			break;
		case "-":
			key = "-";
			onButtonClick(key);
			break;
		case "*":
			key = "*";
			onButtonClick(key);
			break;
		case "/":
			key = "/";
			onButtonClick(key);
			break;
		case "=":
		case "Enter":
			key = "=";
			onButtonClick(key);
			break;
		case ".":
			key = ".";
			onButtonClick(key);
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
      number = "";
      operator = "";
      result = "";
      outputNum.textContent = "";
      outputSign.textContent = "";
      break;
    case "C":
      input.value = input.value.slice(0, input.value.length - 1);
      number = +input.value;
      break;
    case "+/-":
      if (input.value === "" || 0) break;      
      number *= -1;
      input.value = number;
      break;
    case ".":
      let value = input.value;
      if (!isInteger(value)) break;
      if (value === "") {
        input.value = "0.";
        break;
      }
      value = value + ".";
      number = value;
      input.value = number;
      break;
    case "+":
      if (number !== "" || input.value !== "") {
		
        result = equal(result, number);
        operator = "+";
        doAfterCalc();
      }
      break;
    case "-":
      if (number !== "" || input.value !== "") {
        result = equal(result, number);
        operator = "-";
        doAfterCalc();
      }
      break;
    case "*":
      if (number !== "" || input.value !== "") {
        result = equal(result, number);
        operator = "*";
        doAfterCalc();
      }
      break;
    case "/":
      if (number !== "" || input.value !== "") {
        result = equal(result, number);
        operator = "/";
        doAfterCalc();
      }
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
      number = +input.value;
      break;
    case "💡":
      switchTheme();
      setTheme();
      break;
    case "=":
      if (number !== "" || input.value !== "") {
        number = equal(result, number);
        input.value = number;
        result = "";
        operator = "";
		outputSign.textContent = "";
		outputNum.textContent = "";
      }
  }
}

	

function equal(first, second) {
    if (first === "") {
	second = +input.value;
	return second;}
  if (second === "") {second = +input.value};
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
        number = "";
        outputSign.textContent = "";
        outputNum.textContent = "";
        return 0;
      } else return first / second;
    case "":
      return second;
  }
}
function isInteger(num) {
  return num.indexOf(".") === -1;
}
function doAfterCalc() {
  number = "";
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
