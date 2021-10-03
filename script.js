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
let enterNumber = "";
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
      enterNumber = "";
      operator = "";
      input.placeholder = 0;
      result = "";
      outputNum.textContent = "";
      outputSign.textContent = "";
      break;
    case "C":
      input.value = input.value.slice(0, input.value.length - 1);
      enterNumber = +input.value;
      break;
    case "+/-":
      enterNumber = +input.value * -1;
      input.value = +input.value * -1;
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
      input.value = value;
      enterNumber = value;
      break;
    case "+":
      if (enterNumber != "") {
        result = equal(result, enterNumber);
        enterNumber = "";
        input.value = "";
        input.placeholder = 0;
        operator = "+";
        outputSign.textContent = operator;
        outputNum.textContent = result;
      }
      break;
    case "-":
      if (enterNumber != "") {
        result = equal(result, enterNumber);
        enterNumber = "";
        input.value = "";
        input.placeholder = 0;
        operator = "-";
        outputSign.textContent = operator;
        outputNum.textContent = result;
      }
      break;
    case "*":
      if (enterNumber != "") {
        result = equal(result, enterNumber);
        enterNumber = "";
        input.value = "";
        input.placeholder = 0;
        operator = "*";
        outputSign.textContent = operator;
        outputNum.textContent = result;
      }
      break;
    case "/":
      if (enterNumber !== "" && enterNumber !== 0) {
        result = equal(result, enterNumber);
        enterNumber = "";
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
      enterNumber = +input.value;
      break;
    case "=":
      if (enterNumber != "") {
        enterNumber = equal(result, enterNumber);
        input.value = enterNumber;
        input.placeholder = enterNumber;
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
        enterNumber = "";
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
