const d = document

export default function calculator() {
    // Importar elementos del DOM y declarar variables
    const display = d.querySelector('.display'),
        clear = d.getElementById('clear'),
        equals = d.getElementById('equals'),
        dot = d.getElementById('dot'),
        numbers = d.querySelectorAll('#number'),
        operators = d.querySelectorAll('#operator')

    // Variables para almacenar el número actual, la pila y el operador actual
    let currentNumber = '0', // Almacena el número actual en pantalla
        stack = [], // Almacena los números en la pila para cálculos
        operator = null, // Almacena el operador actual

        // Mapeo de operadores para realizar cálculos
        operatorMap = {
            '+': (a, b) => a + b,
            '-': (a, b) => a - b,
            'x': (a, b) => a * b,
            '/': (a, b) => b === 0 ? "Error" : a / b
        }

    // Función para actualizar el contenido del display
    function updateDisplay() {
        return display.textContent = currentNumber
        // parseFloat(currentNumber).toLocaleString('en') -> Esto es para que se muestre con comas directamente
    }

    // Función para borrar todo y reiniciar la calculadora
    function clearDisplay() {
        currentNumber = '0';
        stack = [];
        operator = null;
        updateDisplay();
    }

    // Función para agregar números al número actual
    function appendNumbers(number) {
        // Si el número actual es 0, reemplaza por el nuevo número
        if (currentNumber === '0') {
            currentNumber = number
        }
        else {
            // Si no, agrega el dígito al número actual
            currentNumber += number
        }
        updateDisplay()
    }

    // Función para aplicar operadores y realizar cálculos
    function applyOperator(selectedOperator) {
        // Si el operador seleccionado es '%', dividir el número actual por 100
        if (selectedOperator === '%') {
            const num = parseFloat(currentNumber.replace(",", "."));
            currentNumber = (num / 100).toString().replace(".", ",");
            updateDisplay();
            return;
        }

        // Si el operador seleccionado es '+/-', cambiar el signo del número actual
        else if (selectedOperator === '+/-') {
            const num = parseFloat(currentNumber.replace(",", "."));
            currentNumber = (num * -1).toString().replace(".", ",");
            updateDisplay();
            return;
        }

        // Si hay un número en el display, añadirlo a la pila y reiniciar el número actual
        if (currentNumber !== '') {
            stack.push(parseFloat(currentNumber));
            console.log(currentNumber)
            currentNumber = '';
            console.log(stack)
        }

        // Si hay suficientes elementos en la pila para calcular, realizar la operación
        if (stack.length >= 2) {
            const num2 = stack.pop();
            const num1 = stack.pop();
            // Calcula el resultado usando el operador actual
            const result = operatorMap[operator](num1, num2);
            // Agrega el resultado a la pila y actualiza el número actual y el display
            stack.push(result);
            operator = selectedOperator
            currentNumber = result.toString();
            updateDisplay();
            currentNumber = ''; // Reinicia el número actual para la próxima entrada
        }
        else {
            // Si no hay suficientes elementos en la pila, establece el operador
            operator = selectedOperator
        }
    }

    // Función para agregar el punto decimal al número actual
    function appendDecimal() {
        // Si el número actual aún no tiene un punto decimal, agrégalo
        if (!currentNumber.replace(",", ".").includes(".")) {
            currentNumber += dot.textContent
        }
        updateDisplay()
    }

    // Evento al hacer clic en el botón de borrar
    equals.addEventListener("click", e => {
        // Agregar el número actual a la pila si hay algo en él
        if (currentNumber !== '') {
            stack.push(parseFloat(currentNumber));
            console.log(stack)
            currentNumber = '';
        }

        // if (operator !== null) { }

        // Realizar el cálculo si hay un operador y suficientes elementos en la pila
        if (operator !== null && stack.length >= 2) {
            const num2 = stack.pop();
            const num1 = stack.pop();
            // Calcula el resultado usando el operador actual
            const result = operatorMap[operator](num1, num2);
            // Agrega el resultado a la pila y actualiza el display
            stack.push(result);
            currentNumber = result.toString();
            updateDisplay();
            stack = []; // Reinicia la pila para la próxima operación
        }
    })

    // Evento al hacer clic en el botón de borrar
    clear.addEventListener('click', clearDisplay)

    // Eventos al hacer clic en los botones de números y operadores
    numbers.forEach(btn => btn.addEventListener("click", e => appendNumbers(btn.textContent)))
    operators.forEach(btn => btn.addEventListener("click", e => applyOperator(btn.textContent)))

    // Evento al hacer clic en el botón de punto decimal
    dot.addEventListener("click", appendDecimal)

    // Actualizar el contenido del display al cargar la página
    updateDisplay()
}