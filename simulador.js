function validarFormulario() {
    let esValido = true;

    const mostrarError = (idInput, idError, mensaje) => {
        let input = document.getElementById(idInput);
        let span = document.getElementById(idError);
        if (mensaje) {
            span.innerText = mensaje;
            input.classList.add("invalid");
            esValido = false;
        } else {
            span.innerText = "";
            input.classList.remove("invalid");
        }
    };

    // 1. Validar Ingresos (Mínimo 482)
    let ingresos = parseFloat(document.getElementById("txtIngresos").value);
    mostrarError("txtIngresos", "errIngresos", (isNaN(ingresos) || ingresos < 482) ? "Mínimo sueldo básico ($482)" : "");

    // 2. Validar Egresos
    let egresos = parseFloat(document.getElementById("txtEgresos").value);
    mostrarError("txtEgresos", "errEgresos", (isNaN(egresos) || egresos < 0) ? "Ingrese un valor válido" : "");

    // 3. Validar Monto (400 a 20000)
    let monto = parseFloat(document.getElementById("txtMonto").value);
    mostrarError("txtMonto", "errMonto", (isNaN(monto) || monto < 400 || monto > 20000) ? "Monto entre $400 y $20,000" : "");

    // 4. Validar Plazo (1 a 10 años)
    let plazo = parseInt(document.getElementById("txtPlazo").value);
    mostrarError("txtPlazo", "errPlazo", (isNaN(plazo) || plazo < 1 || plazo > 10) ? "Plazo de 1 a 10 años" : "");

    // 5. Validar Tasa (Mínimo 16%)
    let tasa = parseFloat(document.getElementById("txtTasaInteres").value);
    mostrarError("txtTasaInteres", "errTasa", (isNaN(tasa) || tasa < 16) ? "La tasa mínima es del 16%" : "");

    return esValido;
}

function calcular() {
    if (!validarFormulario()) {
        document.getElementById("spnEstadoCredito").innerText = "DATOS INVÁLIDOS";
        document.getElementById("spnEstadoCredito").style.color = "orange";
        return;
    }

    let ingresos = parseFloat(document.getElementById("txtIngresos").value);
    let egresos = parseFloat(document.getElementById("txtEgresos").value);
    let monto = parseFloat(document.getElementById("txtMonto").value);
    let plazo = parseInt(document.getElementById("txtPlazo").value);
    let tasa = parseFloat(document.getElementById("txtTasaInteres").value);

    let disponible = calcularDisponible(ingresos, egresos);
    let capacidad = calcularCapacidadPago(disponible);
    let interes = calcularInteresSimple(monto, tasa, plazo);
    let total = calcularTotalPagar(monto, interes);
    let cuota = calcularCuotaMensual(total, plazo);

    document.getElementById("spnDisponible").innerText = disponible.toFixed(2);
    document.getElementById("spnCapacidadPago").innerText = capacidad.toFixed(2);
    document.getElementById("spnInteresPagar").innerText = interes.toFixed(2);
    document.getElementById("spnTotalPrestamo").innerText = total.toFixed(2);
    document.getElementById("spnCuotaMensual").innerText = cuota.toFixed(2);

    let aprobado = aprobarCredito(capacidad, cuota);
    let estado = document.getElementById("spnEstadoCredito");
    estado.innerText = aprobado ? "CREDITO APROBADO" : "CREDITO RECHAZADO";
    estado.style.color = aprobado ? "green" : "red";
}

function limpiar() {
    location.reload();
}