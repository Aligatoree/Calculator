let calcButtons = [
    '1','2','3','+',
    '4','5','6','-',
    '7','8','9','*',
    'C','0','=','/'];
let numbers = document.getElementById('numbers');

calcButtons.forEach(sign => {
    let button = document.createElement('button');
    button.className = 'button';
    button.innerHTML = sign;
    numbers.appendChild(button);
});

