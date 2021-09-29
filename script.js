let signs = [
    '1','2','3','+',
    '4','5','6','-',
    '7','8','9','*',
    'C','0','=','/'];
let allButtons = document.getElementById('allButtons');
let info = document.getElementById('info');
let input = document.getElementById('enter');
let firstNumber = '';
let secondNumber = '';
let operator = '';
let result = '';

signs.forEach(sign => {
    let button = document.createElement('button');
    button.className = 'button';
    button.innerHTML = sign;
    allButtons.appendChild(button);
});

document.querySelectorAll('button').forEach(function(button) {
    button.addEventListener('click', onButtonClick);
});

function onButtonClick(event) {
    let num = event.target.innerHTML;
    switch (event.target.innerHTML) {
        case 'C':
            input.value = '';
            enterNumber = '';
            secondNumber = '';
            operator = '';
            input.placeholder = 0;
            result = '';
            break;
        case '+':
            if (enterNumber != '') {
                result = equal(result, enterNumber);
                enterNumber = +input.value;
                input.value = '';
                input.placeholder = result;
                operator = '+';
                break;
            }
            break;
        case '-':
            if (enterNumber != '') {
                result = equal(result, enterNumber);
                enterNumber = +input.value;
                input.value = '';
                input.placeholder = result;
                operator = '-';
            }
            break;
        case '*':
            if (enterNumber != '') {
                result = equal(result, enterNumber);
                enterNumber = +input.value;
                input.value = '';
                input.placeholder = result;
                operator = '*';
            }
            break;
        case '/':
            if (enterNumber !== '' && enterNumber !== 0) {
                result = equal(result, enterNumber);
                enterNumber = +input.value;
                input.value = '';
                input.placeholder = result;
                operator = '/';
            }
            break;
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
            input.value += +num;
            enterNumber = +input.value;
            break;
        case '=':
            if (enterNumber != '') {
                enterNumber = equal(result, enterNumber);
                input.value = '';
                input.placeholder = enterNumber;
                result = '';
                operator = '';
            }


    }


};



function equal(first, second) {
    if (first === '') {
        return second;
    }
    switch (operator) {
        case '+':
            return first + second;
        case '-':
            return first - second;
        case '*':
            return first * second;
        case '/':
            if (second == 0) {
                input.placeholder = 'Error';
                input.value = '';
                enterNumber = '';
                secondNumber = 0;
                return 0;
            } else
                return first / second;
    }
}
