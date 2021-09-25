let signs = [
    '1','2','3','+',
    '4','5','6','-',
    '7','8','9','*',
    'C','0','=','/'];
let allButtons = document.getElementById('allButtons');
let input = document.getElementById('enter');
let firstNumber = 0;
let operator = '';
let result = 0;

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
            firstNumber = 0;
            result = 0;
            break;
        case '+':
            firstNumber += +input.value;
            operator = '+';
            input.value = '';
            break;
        case '-':
            firstNumber -= +input.value;
            operator = '-';
            input.value = '';
            break;
        case '*':
            firstNumber *= +input.value;
            operator = '*';
            input.value = '';
            break;
        case '/':
            firstNumber /= +input.value;
            operator = '/';
            input.value = '';
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
            input.value += Number(num);
            break;
        case '=':
            switch (operator) {
                case '+':
                    input.value = +firstNumber + +input.value;
                    break;
                case '-':
                    input.value = +firstNumber - +input.value;
                    break;
                case '*':
                    input.value = +firstNumber * +input.value;
                    break;
                case '/':
                    input.value = +firstNumber / +input.value;
                    break;
                case '':
                    input.value = firstNumber;
            }
    }
};
