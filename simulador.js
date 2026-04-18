function calcular() {
    let ingresosFloat = 0;
    let egresosFloat = 0;
    let cmpIngresosFloat;
    let cmpEgresosFloat;
    let valorDisponibleFloat;
    let valorDisponibleResultado;
    let capacidadPagoFloat;
    let capacidadPagoResultado;
    let montoEntero;
    let plazoEntero;
    let tasaEntero;
    let interesCalculado;
    let totalPagar;
    let totalPrestamos;
    let cuotaMensual;
    let cuota;
    let creditoA;
    let estadoCredito;

    // 2. Apuntar a los componentes del HTML
    cmpIngresosFloat = document.getElementById("txtIngresos");
    cmpEgresosFloat = document.getElementById("txtEgresos");

    // 3. Obtener los valores y convertirlos a decimales (float)
    ingresosFloat = parseFloat(cmpIngresosFloat.value);
    egresosFloat = parseFloat(cmpEgresosFloat.value);

    // 4. Llamar a la función de lógica que está en funciones.js
    valorDisponibleFloat = calcularDisponible(ingresosFloat, egresosFloat);

    // 5. Mostrar el resultado en el HTML
    // Usamos "spnDisponible" porque es el ID que pusiste en tu HTML
    valorDisponibleResultado = document.getElementById("spnDisponible");
    valorDisponibleResultado.innerText = valorDisponibleFloat.toFixed(2);

    // 6. Calcular la capacidad de pago
    capacidadPagoFloat=calcularCapacidadPago(valorDisponibleFloat);
    // 7. Mostrar el resultado en el HTML
    capacidadPagoResultado = document.getElementById("spnCapacidadPago");
    capacidadPagoResultado.innerText = capacidadPagoFloat.toFixed(2);

    // --- SECCIÓN 2: SOLICITUD DE CRÉDITO (INTERÉS SIMPLE) ---
    // 1. Leer los valores como enteros
    montoEntero = parseInt(document.getElementById("txtMonto").value);
    plazoEntero = parseInt(document.getElementById("txtPlazo").value);
    tasaEntero = parseInt(document.getElementById("txtTasaInteres").value);

    // 2. Llamar a la función y guardar el retorno en una variable
    interesCalculado = calcularInteresSimple(montoEntero, tasaEntero, plazoEntero);

    // 3. Mostrar en pantalla
    document.getElementById("spnInteresPagar").innerText = interesCalculado.toFixed(2);

    totalPagar=calcularTotalPagar(montoEntero, interesCalculado);
    totalPrestamos=document.getElementById("spnTotalPrestamo");
    totalPrestamos.innerText=totalPagar.toFixed(2);

    cuota=calcularCuotaMensual(totalPagar, plazoEntero);
    cuotaMensual=document.getElementById("spnCuotaMensual");
    cuotaMensual.innerText=cuota.toFixed(2);

    creditoA = aprobarCredito(capacidadPagoFloat, cuota);
    estadoCredito = document.getElementById("spnEstadoCredito");

    //Estructura if/else para mostrar el mensaje según el resultado
    if (creditoA === true) {
    estadoCredito.innerText = "CREDITO APROBADO";
    } else {
    estadoCredito.innerText = "CREDITO RECHAZADO";
    }
}

function limpiar() {
    // 1. Limpiar los cuadros de texto (Inputs)
    document.getElementById("txtIngresos").value = "";
    document.getElementById("txtEgresos").value = "";
    document.getElementById("txtMonto").value = "";
    document.getElementById("txtPlazo").value = "";
    document.getElementById("txtTasaInteres").value = "";

    // 2. Limpiar los resultados (Spans)
    document.getElementById("spnDisponible").innerText = "0.00";
    document.getElementById("spnCapacidadPago").innerText = "0.00";
    document.getElementById("spnInteresPagar").innerText = "0.00";
    document.getElementById("spnTotalPrestamo").innerText = "0.00";
    document.getElementById("spnCuotaMensual").innerText = "0.00";

    // 3. Reiniciar el estado del crédito
    let estado = document.getElementById("spnEstadoCredito");
    estado.innerText = "ESPERANDO DATOS...";
}

