const d = document,
    numbers = d.querySelectorAll('#number'),
    operators = d.querySelectorAll('#operator')

export default function calculator() {
    const display = d.querySelector('.display'),
        clear = d.getElementById('clear'),
        equals = d.getElementById('equals'),
        dot = d.getElementById('dot')

    function clearDisplay() {
        clear.addEventListener('click', e => {
            display.textContent = '0'
            console.clear()
        })
    }

    function displayNumbers() {
        numbers.forEach(btn => {
            btn.addEventListener('click', e => {
                if (display.textContent === '0') {
                    display.textContent = btn.textContent
                }
                else {
                    display.textContent += btn.textContent
                }
            })
        })
    }

    function decimal() {
        dot.addEventListener("click", e => {
            if (display.textContent.includes(",")) {
                display.textContent = display.textContent
            }
            else {
                display.textContent += dot.textContent
            }
        })
    }


    function calculates() {
        let num1 = 0
        let op = ''

        operators.forEach(btn => {
            btn.addEventListener('click', e => {
                console.log("valor display:", display.textContent)

                num1 = parseInt(display.textContent)
                console.log("Numero 1:", num1)

                op = btn.textContent;
                if (op === "+/-") {
                    display.textContent = num1 * -1
                }
                else if (op === "%") {
                    num1 = parseFloat(display.textContent)
                    display.textContent = num1 /= 100
                    console.log("valor display en %:", display.textContent)
                    console.log("Numero 1 en %:", num1)
                }
                else {
                    display.textContent = '0'
                }
            });
        });
        equals.addEventListener("click", e => {
            if (op.length > 0) {
                console.log("Hola")
                let result
                let num2 = parseInt(display.textContent)

                console.log("Display:", display.textContent)
                console.log("Numero 2:", num2)

                switch (op) {
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
                        result = num1 / num2
                        break;

                    default:
                        alert("Operador inválido")
                }
                display.textContent = result.toString()
                console.log("Resultado:", result)
                op = ''
            }
            else {
                display.textContent
            }
        });
    }



    // function calculates() {
    //     operators.forEach(btn => {
    //         btn.addEventListener('click', e => {
    //             console.log("valor display:", display.textContent)
    //             let num1 = parseInt(display.textContent)
    //             console.log("Numero 1:", num1)
    //             display.textContent = '0'
    //             let op = btn.textContent

    //             equals.addEventListener("click", e => {
    //                 let result
    //                 let num2 = parseInt(display.textContent)
    //                 console.log("Display:", display.textContent)
    //                 console.log("Numero 2:", num2)

    //                 switch (op) {
    //                     case "+".trim():
    //                         result = num1 + num2
    //                         display.textContent = '0'
    //                         display.textContent = result
    //                         console.log("Resultado:", result)
    //                         break

    //                     case "-".trim():
    //                         result = num1 - num2
    //                         display.textContent = '0'
    //                         display.textContent = result
    //                         console.log("Resultado:", result)
    //                         break

    //                     case "x".trim():
    //                         result = num1 * num2
    //                         display.textContent = '0'
    //                         display.textContent = result
    //                         console.log("Resultado:", result)
    //                         break

    //                     case "/".trim():
    //                         result = num1 / num2
    //                         display.textContent = '0'
    //                         display.textContent = result
    //                         console.log("Resultado:", result)
    //                         break

    //                     default:
    //                         alert("hola")
    //                 }
    //             })
    //         })
    //     })
    // }

    clearDisplay()
    displayNumbers()
    decimal()
    calculates()
}