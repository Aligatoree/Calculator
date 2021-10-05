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
let fraction = false;
let body = document.querySelector("body");
let theme = "light";

signs.forEach((sign) => {
  let button = document.createElement("button");
  let keyboard = document.getElementById("keyboard");
  button.className = "button corner";
  button.innerHTML = sign;
  keyboard.appendChild(button);
});

document.querySelectorAll("button").forEach(function (button) {
  button.addEventListener("click", onButtonClick);
});

function onButtonClick(event) {
  let num = event.target.innerHTML;
  switch (event.target.innerHTML) {
    case "CE":
      input.value = "";
      number = "";
      operator = "";
      result = "";
      fraction = false;
      outputNum.textContent = "";
      outputSign.textContent = "";
      break;
    case "C":
      input.value = input.value.slice(0, input.value.length - 1);
      number = +input.value;
      break;
    case "+/-":
      if (input.value === "" || 0) {
        input.value = "-0";
        number = 0;
      }
      number *= -1;
      input.value = number;
      break;
    case ".":
      let value = input.value;
      if (!isInteger(value)) break;
      if (value === "") {
        input.value = "0.0";
        fraction = true;
        break;
      }
      value = value + ".0";
      fraction = true;
      number = value;
      input.value = number;
      break;
    case "+":
      if (number !== "") {
        result = equal(result, number);
        operator = "+";
        doAfterCalc();
      }
      break;
    case "-":
      if (number !== "") {
        result = equal(result, number);
        operator = "-";
        doAfterCalc();
      }
      break;
    case "*":
      if (number !== "") {
        result = equal(result, number);
        operator = "*";
        doAfterCalc();
      }
      break;
    case "/":
      if (number !== "") {
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
        input.value = input.value.slice(0, input.maxLength);
      input.value += +num;
      if (fraction === true && !(input.value === "")) {
        fraction = false;
        let value = input.value;
        value = value.slice(0, input.value.indexOf(".")) + "." + num;
        input.value = value;
      } else fraction = false;
      if (
        input.value.length > 1 &&
        input.value[0] === "0" &&
        !(input.value[1] === ".")
      ) {
        input.value = input.value.slice(1);
      }
      number = +input.value;
      break;
    case "💡":
      switchTheme();
      break;
    case "=":
      if (number !== "") {
        number = equal(result, number);
        input.value = number;
        result = "";
        operator = "";
      }
  }
}

function equal(first, second) {
  if (first === "") {
    return second;
  }
  outputSign.textContent = "";
  outputNum.textContent = "";
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
  fraction = false;
}
function switchTheme() {
  if (theme === "dark") {
    theme = "light";
    body.style.setProperty("--body-color", "whitesmoke");
    body.style.setProperty("--calc-color", "darkgrey");
  } else {
    theme = "dark";
    body.style.setProperty("--body-color", "darkgrey");
    body.style.setProperty("--calc-color", "grey");
  }
}
