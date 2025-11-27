const sum = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const operate = (a, b, operator) => {
    a = parseFloat(a);
    b = parseFloat(b);
    switch(operator) {
        case '+':
            return sum(a, b);
        
        case '-':
            return subtract(a, b);

        case 'x':
            return multiply(a, b);

        case '÷':
            return divide(a, b);
    }
};

let num1 = '';
let num2 = '';
let operator = '';
let operatorUsed = false;
let newCalc = true;

const mathOperatorArr = ['+', '-', 'x', '÷'];

const btns = document.querySelector('.input-area');
const display = document.querySelector('.output-area');
const updateDisplay = (text => display.firstElementChild.textContent = text);

btns.addEventListener('click', (event) => {
    const clickedContent = event.target.textContent;
    if(clickedContent === 'AC'){
        num1 = '';
        num2 = '';
        operator = '';
        operatorUsed = false;
    }

    else if(clickedContent === '='){
        //no need to add the operator here too because num2 only gets values after the operator gets them first.
        if(num1 !== '' && num2 !== '')
        {
            num1 = operate(num1, num2, operator);
            num2 = '';
            operator = '';
            operatorUsed = false;
            newCalc = false;
        }
    }
    else if(mathOperatorArr.includes(clickedContent)){
        if(operatorUsed === true && num2 !== ''){
            num1 = operate(num1, num2, operator);
            num2 = '';
            newCalc = false;
        }
        operator = clickedContent;
        operatorUsed = true;
    }
    //only insert the 2nd num after an operator has been used.
    else if(operatorUsed === true){
        num2 += clickedContent;
    }
    else {
        if(newCalc === true){
            num1 += clickedContent;
        }
        else {
            num1 = clickedContent;
            newCalc = true;
        }
    }
    if(num1 === Infinity){
        updateDisplay('STOP THIS NONSENSE');
    }
    else {
        updateDisplay(`${num1} ${operator} ${num2}`);
    }
}); 