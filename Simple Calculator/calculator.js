const calculator = document.querySelector('.calculator-grid');
const output = calculator.querySelector('.output');
const previousOperandText = output.querySelector('[data-previous-operand]');
const currentOperandText = output.querySelector('[data-current-operand]');
const allClearButton = calculator.querySelector('[data-all-clear]');
const deleteButton = calculator.querySelector('[data-delete]');
const operationButtons = calculator.querySelectorAll('[data-operation]');
const numberButtons = calculator.querySelectorAll('[data-number]');
const equalsButton = calculator.querySelector('[data-equals]');

class Calculator {
  constructor(previousOperandText, currentOperandText) {
    this.previousOperandText = previousOperandText;
    this.currentOperandText = currentOperandText;
    this.clear();
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '÷':
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandText.innerText = this.getDisplayNumber(this.currentOperand);
    if (this.operation != null) {
      this.previousOperandText.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
    } else {
      this.previousOperandText.innerText = '';
    }
  }
}

const calculatorInstance = new Calculator(previousOperandText, currentOperandText);

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculatorInstance.appendNumber(button.innerText);
    calculatorInstance.updateDisplay();
  });
});

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculatorInstance.chooseOperation(button.innerText);
    calculatorInstance.updateDisplay();
  });
});

equalsButton.addEventListener('click', button => {
  calculatorInstance.compute();
  calculatorInstance.updateDisplay();
});

allClearButton.addEventListener('click', button => {
  calculatorInstance.clear();
  calculatorInstance.updateDisplay();
});

deleteButton.addEventListener('click', button => {
  calculatorInstance.delete();
  calculatorInstance.updateDisplay();
});
