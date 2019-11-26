// creates an object to keep track of values
const calculator = {
    display_value: '0',
    first_operand: null,
    wait_second_operand: false,
    operator: null,
};

// this modifies calues each time a button is clicked
function input_digit(digit) {
    const { display_value, wait_second_operand } = calculator;
    if (wait_second_operand === true) {
        calculator.display_value = digit;
        calculator.wait_second_operand = false;
    } else {
        calculator.display_value = display_value === '0' ? digit : display_value + digit;
    }
}

// this section handles decimal points
function input_decimal(dot) {
    if (calculator.wait_second_operand === true) return;
    if (!calculator.display_value.includes(dot)) {
        calculator.display_value += dot;
    }
}

// this section handles operators
function handle_operator(next_operator) {
    const { first_operand, display_value, operator } = calculator
    const value_of_input = parseFloat(display_value);
    if (operator && calculator.wait_second_operand) {
        calculator.operator = next_operator;
        return;
    }
    if (first_operand == null) {
        calculator.first_operand = value_of_input;
    } else if (operator) {
        const value_now = first_operand || 0;
        const result = perform_calculation[operator](value_now, value_of_input);

        calculator.display_value = String(result);
        calculator.first_operand = result;
    }

    calculator.wait_second_operand = true;
    calculator.operator = next_operator;
}

const perform_calculation = {
    '/': (first_operand, second_operand) => first_operand / second_operand,
    '*': (first_operand, second_operand) => first_operand * second_operand,
    '+': (first_operand, second_operand) => first_operand + second_operand,
    '-': (first_operand, second_operand) => first_operand - second_operand,
    '=': (first_operand, second_operand) => second_operand,

};

function calculator_reset() {
    calculator.display_value = '0';
    calculator.first_operand = null;
    calculator.wait_second_operand = false;
    calculator.operator = null;
}

function update_display() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.display_value;
}

update_display();
const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => { // the second ")" wasn't included...
    const { target } = event;
    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('operator')) {
        handle_operator(target.value);
        update_display();
        return;
    }

    if (target.classList.contains('decimal')) {
        input_decimal(targt.value);
        update_display();
        return;
    }
    if (target.classList.contains('all-clear')) {
        calculator_reset();
        update_display();
        return;
    }

    input_digit(target.value);
    update_display();

})