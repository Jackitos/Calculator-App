const d = document

export default function calculator() {
    const display = d.querySelector('.display'),
        clear = d.getElementById('clear'),
        equals = d.getElementById('equals'),
        dot = d.getElementById('dot'),
        numbers = d.querySelectorAll('#number'),
        operators = d.querySelectorAll('#operator')

    let currentNumber = '0',
        num1 = null,
        num2 = null,
        operator = null

    function updateDisplay() {
        return display.textContent = currentNumber
        // parseFloat(currentNumber).toLocaleString('en') -> Esto es para que se muestre con comas directamente
    }

    function clearDisplay() {
        currentNumber = '0'
        num1 = null
        num2 = null
        operator = null
        updateDisplay()
    }

    function appendNumbers(number) {
        if (currentNumber === '0') {
            currentNumber = number
        }
        else {
            currentNumber += number
        }
        updateDisplay()
    }

    function applyOperator(selectedOperator) {
        if (num2 !== null) {
            calculates()
            num1 = parseFloat(currentNumber.replace(",", "."))
            num2 = null
        }
        else {
            num1 = parseFloat(currentNumber.replace(",", "."))
        }
        operator = selectedOperator
        currentNumber = '0'
        updateDisplay()
    }

    function appendDecimal() {
        if (!currentNumber.replace(",", ".").includes(".")) {
            currentNumber += dot.textContent
        }
        updateDisplay()
    }

    function calculates() {
        if (num2 === null) {
            // Si num2 es null, sumamos el valor de num2 a currentNumber
            if (operator === "+") {
                currentNumber = (parseFloat(currentNumber.replace(",", ".")) + num1).toString();
            } else if (operator === "-") {
                currentNumber = (parseFloat(currentNumber.replace(",", ".")) - num1).toString();
            } else if (operator === "x") {
                currentNumber = (parseFloat(currentNumber.replace(",", ".")) * num1).toString();
            } else if (operator === "/") {
                currentNumber = (parseFloat(currentNumber.replace(",", ".")) / num1).toString();
            }
        }
        else {
            num2 = parseFloat(currentNumber.replace(",", "."))
            let result
            switch (operator) {
                case "+":
                    result = num1 + num2
                    break;

                case "-":
                    result = num1 - num2
                    break;

                case "x":
                    result = num1 * num2
                    break;

                case "/":
                    if (parseFloat(num2) === 0) {
                        currentNumber = "Error"
                        updateDisplay()
                        return
                    }
                    result = num1 / num2
                    break;

                default:
                    return
            }
            currentNumber = result.toString()
            num1 = parseFloat(currentNumber.replace(",", "."));
        }
        updateDisplay()

        // operators.forEach(btn => {
        //     btn.addEventListener('click', e => {
        //         console.log("valor display:", display.textContent)

        //         num1 = parseInt(display.textContent)
        //         console.log("Numero 1:", num1)

        //         op = btn.textContent;
        //         if (op === "+/-") {
        //             display.textContent = num1 * -1
        //         }
        //         else if (op === "%") {
        //             num1 = parseFloat(display.textContent)
        //             display.textContent = num1 /= 100
        //             console.log("valor display en %:", display.textContent)
        //             console.log("Numero 1 en %:", num1)
        //         }
        //         else {
        //             display.textContent = '0'
        //         }
        //     });
        // });
    }

    equals.addEventListener("click", e => {
        calculates()
        num2 = null
    })
    clear.addEventListener('click', clearDisplay)
    numbers.forEach(btn => btn.addEventListener("click", e => appendNumbers(btn.textContent)))
    operators.forEach(btn => btn.addEventListener("click", e => applyOperator(btn.textContent)))
    dot.addEventListener("click", appendDecimal)
    updateDisplay()
}

// equals.addEventListener("click", e => {
        //     // if (op.length > 0) {
        //     //     console.log("Hola")
        //     //     let result
        //     //     let num2 = parseInt(display.textContent)

        //     //     console.log("Display:", display.textContent)
        //     //     console.log("Numero 2:", num2)

        //     //     switch (op) {
        //     //         case "+":
        //     //             result = num1 + num2
        //     //             break;

        //     //         case "-":
        //     //             result = num1 - num2
        //     //             break;

        //     //         case "x":
        //     //             result = num1 * num2
        //     //             break;

        //     //         case "/":
        //     //             result = num1 / num2
        //     //             break;

        //     //         default:
        //     //             alert("Operador inválido")
        //     //     }
        //     //     display.textContent = result.toString()
        //     //     console.log("Resultado:", result)
        //     //     op = ''
        //     // }
        //     // else {
        //     //     display.textContent
        //     // }
        //     let result
        //     let num2 = parseInt(display.textContent)

        //     console.log("Display:", display.textContent)
        //     console.log("Numero 2:", num2)

        //     if (result === Infinity) {
        //         display.textContent = "Error"
        //     }
        //     else {
        //         display.textContent = result.toString()
        //         console.log("Resultado:", result)
        //         // op = ''
        //     }
        // });