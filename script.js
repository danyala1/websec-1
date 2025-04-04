// Массив для хранения истории операций
const operationHistory = [];
const MAX_HISTORY_ITEMS = 5; // Максимальное количество сохраняемых операций

function calculate() {
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const operationSelect = document.getElementById('operation');
    
    const num1 = parseFloat(num1Input.value);
    const num2 = parseFloat(num2Input.value);
    const operation = operationSelect.value;
    
    // Проверка валидности ввода
    if (isNaN(num1) || isNaN(num2)) {
        showResult('Введите оба числа');
        return;
    }

    // Получаем символ для отображения операции
    const operationSymbol = getOperationSymbol(operation);
    
    try {
        const result = performCalculation(num1, num2, operation);
        const resultString = `${num1} ${operationSymbol} ${num2} = ${result}`;
        
        // Добавляем в историю и обновляем отображение
        addToHistory(resultString);
        showHistory();
        
        // Очищаем поля ввода после успешного расчета
        num1Input.value = '';
        num2Input.value = '';
        num1Input.focus();
    } catch (error) {
        showResult(error.message);
    }
}

function getOperationSymbol(operation) {
    const symbols = {
        '+': '+',
        '-': '-',
        '*': '×',
        '/': '÷'
    };
    return symbols[operation] || operation;
}

function performCalculation(num1, num2, operation) {
    switch (operation) {
        case '+': return num1 + num2;
        case '-': return num1 - num2;
        case '*': return num1 * num2;
        case '/':
            if (num2 === 0) throw new Error('Деление на ноль невозможно');
            const result = num1 / num2;
            return Number.isInteger(result) ? result : parseFloat(result.toFixed(2));
        default:
            throw new Error('Неизвестная операция');
    }
}

function addToHistory(resultString) {
    operationHistory.push(resultString);
    // Ограничиваем размер истории
    if (operationHistory.length > MAX_HISTORY_ITEMS) {
        operationHistory.shift();
    }
}

function showHistory() {
    const resultBox = document.getElementById('result-box');
    let historyHTML = '';
    
    // Добавляем предыдущие результаты
    operationHistory.slice(0, -1).forEach(item => {
        historyHTML += `<div class="history-item">${item}</div>`;
    });
    
    // Добавляем текущий результат (последний в массиве)
    if (operationHistory.length > 0) {
        historyHTML += `<div class="current-result">${operationHistory[operationHistory.length - 1]}</div>`;
    }
    
    resultBox.innerHTML = historyHTML || '<div class="history-item">Здесь появится история вычислений</div>';
}

function showResult(message) {
    document.getElementById('result-box').innerHTML = 
        `<div class="current-result">${message}</div>`;
}

// Инициализация калькулятора
document.addEventListener('DOMContentLoaded', () => {
    // Обработчик для кнопки
    document.getElementById('calculate-btn').addEventListener('click', calculate);
    
    // Обработчики для полей ввода (реакция на Enter)
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                calculate();
            }
        });
    });
    
    // Фокус на первое поле при загрузке
    document.getElementById('num1').focus();
});