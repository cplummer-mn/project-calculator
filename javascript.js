function add(x,y) {
    return (x + y);
}

function subtract(x,y) {
    return (x - y);
}

function multiply(x,y) {
    return (x * y);
}

function divide(x,y) {
    return (x / y);    
}

function operate(o,x,y) {
    let numOne = +x;
    let numTwo = +y;
    if(o == '+') {
        return add(numOne,numTwo);
    }
    else if(o == '-') {
        return subtract(numOne,numTwo);
    }
    else if(o == '*') {
        return multiply(numOne,numTwo);
    }
    else if(o == '/') {
        return divide(numOne,numTwo);
    }
}

var firstNum = '';
var secondNum = '';
var operator = '';

let result = 0;
let waiting = true;
let justSolved = false;
let justOperated = false;

const displayValue = document.querySelector('#display');
const displayValueTwo = document.querySelector('#displayTwo');

displayValueTwo.textContent = '';

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if(button.id == '/' || button.id == '*' || button.id == '-' || button.id == '+' ){
            if (justOperated) {
                return;
            }
            else if (justSolved) {
                displayValueTwo.textContent = firstNum + ' ' + operator + ' ' + secondNum
                    + ' = ' + result + ' ' + `${button.id}`;
                    operator = button.id;
                    firstNum = result;
                    waiting = true;
                    justSolved = false;
                    justOperated = true;
            }
            else if(!firstNum == ''){
                secondNum = displayValue.textContent;
                result = operate(operator,firstNum,secondNum);
                displayValueTwo.textContent = firstNum + ' ' + operator + ' ' + secondNum
                    + ' = ' + result; 
                firstNum = result;
                operator = button.id;
                waiting = true;
                justOperated = true;
            }
            else {
            firstNum = displayValue.textContent;
            operator = button.id;
            displayValueTwo.textContent = firstNum + " " + operator;
            waiting  = true;
            justOperated = true;
            }
            
        }
        else if(button.id == '=') {
            if(justOperated == true) {
                return;
            }
            else if(operator == '/' && displayValue.textContent == 0) {
                alert('NICE TRY BUDDY. THAT DOESN\'T WORK');
                clearCalc();
            }
            else if(firstNum == '') {
                return;
            }
            else if (justSolved == true) {
                displayValueTwo.textContent = result + ' ' + operator + ' ' + secondNum + ' = ';
                result = operate(operator,result,secondNum);
                displayValue.textContent = result;
            }
            else {
            secondNum = displayValue.textContent;
            result = operate(operator,firstNum,secondNum);
            displayValueTwo.textContent = firstNum + ' ' + operator + ' ' + secondNum
            + ' =';
            displayValue.textContent = result;
            justSolved = true;
            justOperated = false;
            }
        }
        else if(button.id == 'clear') {
            clearCalc();
        }
        else if (button.id == 'delete') {
            displayValue.textContent = displayValue.textContent.slice(0,-1);
            if(displayValue.textContent.length == 0) {
                displayValue.textContent = 0;
            }
        }
        else if(displayValue.textContent == '0' || waiting) {
            displayValue.textContent = button.id;
            waiting = false;
            justOperated = false;
        }
        else {
            if(displayValue.textContent.length > 9) {
                return;
            }
            else { 
                displayValue.textContent += button.id;
                justOperated = false;
            }
        }
         //DEBUG CODE
        console.log('firstNum = ' + firstNum, 
        'secondNum = ' + secondNum,
        'operator = ' + operator,
        'result = ' + result,
        'waiting = ' + waiting,
        'justSolved = ' + justSolved);
    });
});

function clearCalc() {
    displayValue.textContent = '0';
    displayValueTwo.textContent = '';
    firstNum = '';
    secondNum = '';
    operator = '';
    result = 0;
    justSolved = false;
    justOperated = false;
}

function pressKey(e) {
    const key = e.keyCode;
    console.log(key);
    if(document.querySelector(`button[data-key="${key}"]`) !== null) {
    document.querySelector(`button[data-key="${key}"]`).click();
    }
}

window.addEventListener('keydown',pressKey);