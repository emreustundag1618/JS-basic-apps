const display = document.querySelector(".calculator-input")
const keys = document.querySelector(".calculator-keys")

let displayValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

updateDisplay();

function updateDisplay() {
    display.value = displayValue;
}

keys.addEventListener("click", (e) => {
    const element = e.target;
    const value = element.value

    // buradaki returnden sonra event fonksiyonun altındaki kodlar işletilmeyecek demek
    if (!element.matches("button")) return;

    switch (value) {
        case "+":
        case "-":
        case "*":
        case "/":
        case "=":
            handleOperator(value);
            break;
        case ".":
            addDecimal();
        case "clear":
            clear();
            break;
        default:
            // console.log("number", element.value)
            inputNumber(value);
            
    }
    updateDisplay();
})

function inputNumber(num) {
    if (waitingForSecondValue) {
        displayValue = num;
        waitingForSecondValue = false;
    } else {
        displayValue = displayValue === "0" ? num : displayValue + num;
    }

    console.log(displayValue, firstValue, operator, waitingForSecondValue)

}

function addDecimal() {
    if (!displayValue.includes(".")) {
        displayValue += ".";
    }
    console.log(displayValue, firstValue, operator, waitingForSecondValue)
}

function clear() {
    displayValue = "0";
}

function handleOperator(nextOperator) {

    const value = parseFloat(displayValue);

    if (operator && waitingForSecondValue) {
        operator = nextOperator;
        return
    }

    if (firstValue === null) {
        firstValue = value;
    } else if (operator) {
        const result = calculate(firstValue, value, operator);

        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstValue = result;
    }

    waitingForSecondValue = true;
    operator = nextOperator;

    console.log(displayValue, firstValue, operator, waitingForSecondValue)
}

function calculate(first, second, operator) {
    if (operator === "+") {
        return first + second;
    } else if (operator === "-") {
        return first-second
    } else if (operator === "*") {
        return first*second
    } else if (operator == "/") {
        return first / second;
    }
    return second;
}