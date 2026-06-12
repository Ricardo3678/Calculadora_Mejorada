const historial = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']; // Array para almacenar el historial de cálculos realizados, inicializado con los dígitos del 0 al 9 para facilitar la entrada de números

(function () {
    const display = document.getElementById('display'); // Obtener el elemento del display de la calculadora para mostrar los números y resultados
    const buttons = document.querySelectorAll('.button-grid button'); // Obtener todos los botones de la calculadora para agregarles eventos de clic
    const historialList = document.getElementById('historial-list'); // Obtener el elemento de la lista del historial para mostrar las operaciones realizadas
    const historyPanel = document.getElementById('history-panel'); // Obtener el elemento del panel lateral del historial para mostrar u ocultar el historial de cálculos
    let currentInput = '';

    function appendToDisplay(value){// Agregar el valor al display y actualizar la entrada actual
        currentInput += value;// Concatenar el nuevo valor a la entrada actual
        display.value = currentInput;// Actualizar el display con la nueva entrada
    }

    function updateHistorialDisplay(){ // Actualizar la lista del historial con las últimas operaciones realizadas
        if (!historialList) return; // Verificar si el elemento del historial existe antes de intentar actualizarlo
        historialList.innerHTML = ''; // Limpiar la lista del historial antes de agregar las nuevas entradas
        const latest = historial.slice(-10);
        latest.forEach(entry => {
            const listItem = document.createElement('li');
            listItem.textContent = entry;
            historialList.appendChild(listItem);
        });
    }

    function clearDisplay(){ // Limpiar el display y resetear la entrada actual
        currentInput = ''; // Reiniciar la entrada actual
        display.value = currentInput; // Limpiar el display
    }

    function deleteLast(){// Eliminar el último carácter de la entrada actual y actualizar el display
        currentInput = currentInput.slice(0, -1);// Eliminar el último carácter de la entrada actual
        display.value = currentInput;// Actualizar el display con la nueva entrada
    }

    function calculateResult(){// Evaluar la expresión actual y mostrar el resultado en el display
        try {
            const result = eval(currentInput);// Evaluar la expresión actual utilizando eval (ten cuidado con esta función en producción)
            display.value = result;// Mostrar el resultado en el display
            historial.push(`${currentInput} = ${result}`);// Agregar la operación completa al historial
            currentInput = result.toString();// Actualizar la entrada actual con el resultado para permitir cálculos continuos
            if (historyPanel && historyPanel.classList.contains('visible')) {// Si el panel del historial está visible, actualizar la lista del historial para mostrar la nueva operación
                updateHistorialDisplay(); //
            }
        } catch (error) {// Si hay un error en la evaluación (por ejemplo, una expresión mal formada), mostrar un mensaje de error
            display.value = 'Error';// Mostrar un mensaje de error en el display
            currentInput = '';// Reiniciar la entrada actual
        }
    }

    function showHistorial(){// Mostrar el historial de resultados en la lista lateral
        updateHistorialDisplay();
        if (historyPanel) {
            historyPanel.classList.toggle('visible');
        }
    }

    function operarSuma(a, b){// Realizar la suma de dos números
        return a + b;
    }

    function operarResta(a, b){// Realizar la resta de dos números
        return a - b;
    }

    function operarMultiplicacion(a, b){// Realizar la multiplicación de dos números
        return a * b;
    }

    function operarDivision(a, b){// Realizar la división de dos números, manejando el caso de división por cero
        if (b === 0) {
            return 'Error: División por cero';
        }
        return a / b;
    }

    buttons.forEach(button => {// Agregar un evento de clic a cada botón para manejar la interacción del usuario
        button.addEventListener('click',() => {// Obtener el valor del botón a través del atributo data-value
            const value = button.getAttribute('data-value');// Utilizar un switch para determinar la acción a realizar según el valor del botón
            switch (value){// Manejar diferentes casos según el valor del botón
                case 'C':
                    clearDisplay();
                    break;
                case 'DEL':
                    deleteLast();
                    break;
                case '=':
                    calculateResult();
                    break;

                case 'H':
                    showHistorial();
                    break;

                case '+':
                case '-':
                case '*':
                case '/':
                    appendToDisplay(value);
                    break;
                default: // Para cualquier otro valor (números y punto decimal), agregarlo al display
                    appendToDisplay(value);
                    break;
            }
        })
    })
})();