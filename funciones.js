function calcularDisponible(ingresos, egresos) {
    let valorDisponible=0;
    valorDisponible = ingresos - egresos;
    if (valorDisponible < 0) {
        return 0;
    } else {
        return valorDisponible;
    }
}

function calcularCapacidadPago(montoDisponible){
    return montoDisponible * 0.5;
}

function calcularInteresSimple(monto, tasa, plazoAnios) {
    return monto * plazoAnios * (tasa / 100);
}

function calcularTotalPagar(monto, interes) {
    return monto + interes + 100;
}

function calcularCuotaMensual(total, plazoAnios) {
    return total / (plazoAnios * 12);
}

function aprobarCredito(capacidadPago, cuotaMensual) {
    if (capacidadPago > cuotaMensual) {
        return true;
    } else {
        return false;
    }
}