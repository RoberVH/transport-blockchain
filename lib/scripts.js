/** Funciones de soporte para las funciones de Procesamiento de Transacciones de logic.js*/

/**************************************************************************************************************** */    
/*  Rutinas de soporte */
/**************************************************************************************************************** */
function crearIDAsistencia(IdRuta,parada) {
    /* Generar un ID para asistencia */
    hoy= new Date();
    var mes = hoy.getMonth()+1;
    if((mes+'').length == 1)  mes = '0'+mes;
    var numDia = hoy.getDate();
    if((numDia+'').length == 1)  numDia = '0' + numDia;
    return 'ASIS-' + "-" + IdRuta.substring(0,5) + "-" + parada.substring(0,5) +  "-" + numDia.toString() +  mes.toString() + hoy.getFullYear().toString();
    
}
