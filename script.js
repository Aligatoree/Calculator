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
  "",
  "0",
  ".",
  "=",
];
let allButtons = document.getElementById("allButtons");
let input = document.getElementById("enter");
let outputNum = document.getElementById("outputNum");
let outputSign = document.getElementById("outputSign");
let operator = "";
let number = "";
let result = "";
let fraction = false;

signs.forEach((sign) => {
  let button = document.createElement("button");
  button.className = "button";
  button.innerHTML = sign;
  allButtons.appendChild(button);
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
      input.placeholder = 0;
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
        number = "";
        input.value = "";
        input.placeholder = 0;
        operator = "+";
        outputSign.textContent = operator;
        outputNum.textContent = result;
      }
      break;
    case "-":
      if (number !== "") {
        result = equal(result, number);
        number = "";
        input.value = "";
        input.placeholder = 0;
        operator = "-";
        outputSign.textContent = operator;
        outputNum.textContent = result;
      } else {
        input.value = -0;
      }
      break;
    case "*":
      if (number !== "") {
        result = equal(result, number);
        number = "";
        input.value = "";
        input.placeholder = 0;
        operator = "*";
        outputSign.textContent = operator;
        outputNum.textContent = result;
      }
      break;
    case "/":
      if (number !== "" && number !== 0) {
        result = equal(result, number);
        number = "";
        input.value = "";
        input.placeholder = 0;
        operator = "/";
        outputSign.textContent = operator;
        outputNum.textContent = result;
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
      if (fraction === true) {
        fraction = false;
        let value = input.value;
        value = value.slice(0, input.value.indexOf(".")) + "." + num;
        input.value = value;
      }
      if (
        input.value.length > 1 &&
        input.value[0] === "0" &&
        !(input.value[1] === ".")
      ) {
        input.value = input.value.slice(1);
      }
      number = +input.value;
      break;
    case "=":
      if (number != "") {
        number = equal(result, number);
        input.value = number;
        input.placeholder = number;
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
      if (second == 0) {
        input.placeholder = "Error";
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
  if (num.indexOf(".") === -1) return true;
  else return false;
}
