function add (num1, num2){
    return num1 + num2;
}
function subtract (num1, num2){
    return num1 - num2;
}
function multiply (num1, num2){
    return num1 * num2;
}
function divide (num1, num2){
    return num1 / num2;
}

function operate (num1, operator, num2){
    if (operator == "+") {
         return add(num1, num2);
    }else if (operator == "-") {
        return subtract(num1, num2);
    }else if (operator == "×") {
        return multiply(num1, num2);
    }else if (operator == "÷") {
        return divide(num1, num2);
    }else if (operator =="%") {
        return num1%num2;
   }else {
    return num1;
   }
}
let displayValue = '';
let resultValue = '';
const display  = document.getElementById('display');
const result = document.getElementById('result');

function appendToDisplay(value) {
    if (displayValue.length < 16) {
        if(displayValue == '0'){
            displayValue='';
        }
        if (value == '.' && displayValue == ''){
            value = '0.'
        }
        if (value == '.' && displayValue.includes('.')){
            value = '';
        }
        
        displayValue +=value;
        updateDisplay();
    }
}

function updateDisplay() {
    display.value = displayValue;
    result.value = '';
}

function resetDisplay() {
    displayValue = '0';
    updateDisplay();
}

function clearDisplay() {
    displayValue = displayValue.slice(0,-1);
    updateDisplay();
}

function calculate() {
    const inputExpression = displayValue;

    // Split the input expression into tokens
    const tokens = inputExpression.split(/([+\-%*/×÷])/).filter(token => token.trim() !== '');

    // Define operator precedence
    const precedence = {
        '+': 1,
        '-': 1,
        '×': 2,
        '÷': 2,
        '%': 2,
    };

    const outputStack = [];
    const operatorStack = [];

    for (const token of tokens) {
        if (!isNaN(parseFloat(token))) {
            // Token is a number, push it to the output stack
            outputStack.push(parseFloat(token));
        } else if (token in precedence) {
            // Token is an operator
            while (
                operatorStack.length > 0 &&
                precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]
            ) {
                // Pop operators with higher precedence and evaluate them
                const operator = operatorStack.pop();
                const num2 = outputStack.pop();
                const num1 = outputStack.pop();
                const result = operate(num1, operator, num2);
                outputStack.push(result);
            }
            operatorStack.push(token);
        }
    }

    // Process any remaining operators in the operator stack
    while (operatorStack.length > 0) {
        const operator = operatorStack.pop();
        const num2 = outputStack.pop();
        const num1 = outputStack.pop();
        const result = operate(num1, operator, num2);
        outputStack.push(result);
    }

    // The result should be the only element in the output stack
    if (outputStack.length === 1) {
        resultValue = outputStack[0];
        const resultStr = resultValue.toString();
        if (resultStr.length > 8) {
            resultValue = parseFloat(resultValue.toFixed(8).toString());
        }
        if (resultValue > 99999999) {
            resultValue = Number(resultValue).toExponential(2);
        }
        if (isNaN(resultValue)) {
            resultValue = "ERROR";
        }
        result.value = resultValue;
    } else {
        result.value = "ERROR";
    }
}

