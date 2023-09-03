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
// console.log(add(2,3));
// console.log(subtract(2,3));
// console.log(multiply(2,3));
// console.log(divide(2,3));
let firstNumber, secondNumber, operator;

function operate (num1, operator, num2){
    if (operator == "+") {
         return add(num1, num2);
    }else if (operator == "-") {
        return subtract(num1, num2);
    }else if (operator == "*") {
        return multiply(num1, num2);
    }else if (operator == "/") {
        return divide(num1, num2);
   }
}
