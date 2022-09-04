const displayScreen = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstValue = 0;
let operatorType = '';
let awaitingNextValue = false;

const sendButtonPlaceholder = placeholder => {
    if(awaitingNextValue) {
        displayScreen.textContent = placeholder;
        awaitingNextValue = false;
    } else {
        let displayText = displayScreen.textContent;
        displayScreen.textContent = displayText === '0' ? placeholder : displayText + placeholder;
    }
}

// Reset calculator
const resetScreen = () => {
    displayScreen.textContent = '0';
    firstValue = 0;
    operatorType = '';
    awaitingNextValue = false;
};

// Limit the number of decimal point
const limitDecimal = () => {
    if(awaitingNextValue) return;
    if(!displayScreen.textContent.includes('.')) {
        displayScreen.textContent = displayScreen.textContent + '.'
    }
}

const calculate = {
    '+' : (firstValue, currentValue) => firstValue + currentValue,
    '-' : (firstValue, currentValue) => firstValue - currentValue,
    '➗' : (firstValue, currentValue) => firstValue / currentValue,
    '✖' : (firstValue, currentValue) => firstValue * currentValue,
    '=' : (firstValue, currentValue) => currentValue
}

const useOperator = operator => {
    let answer;
    if(operatorType && awaitingNextValue) {
        operatorType = operator;
        return;
    };
    const currentValue = displayScreen.textContent;
    if(!firstValue) {
        firstValue = currentValue;
    } else {
        const calculation = calculate[operatorType](firstValue, currentValue)
        displayScreen.textContent = calculation;
        firstValue = calculation;
    }
    operatorType = operator;
    awaitingNextValue = true;  
}

// Event Listeners
inputBtns.forEach(btn => {
    if(btn.classList.length === 0) {
        btn.addEventListener('click', () => sendButtonPlaceholder(Number(btn.value)));
    } else if(btn.classList.contains('operator')) {
        btn.addEventListener('click', () => useOperator(btn.value));
    } else if(btn.classList.contains('decimal')) {
        btn.addEventListener('click', () => limitDecimal());
    }
})

clearBtn.addEventListener('click', resetScreen)

