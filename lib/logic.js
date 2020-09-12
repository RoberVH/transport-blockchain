/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

/**
 * Transaccion para Crear la ruta  
 * @param {org.effortium.transpo.crearRuta} datosRuta
 * @transaction
 */
async function fcrearRuta(datosRuta) {

    const NS =  'org.effortium.transpo';
    const registro = '.ruta';

    // Obtener el registry para el asset.
    const assetRegistry = await getAssetRegistry(NS + registro);
    
    // Crea un objeto asset 'ruta'  para registrar valores

    var assetRuta = getFactory().newResource(NS,'ruta',datosRuta.IdRuta);

    // Asigna valores recibidos al asset
    assetRuta.IdOperador = datosRuta.IdOperador;
    assetRuta.paradas = datosRuta.paradas;
    
    // Crear el asset en el registry 
    await assetRegistry.add(assetRuta);

    // Crea y emite el evento para la creación del asset 'ruta'
    let evento = getFactory().newEvent(NS, 'rutaAsignada');
    evento.IdRuta = datosRuta.IdRuta;
    evento.IdOperador = datosRuta.IdOperador;
    evento.paradas = datosRuta.paradas;
    emit(evento);
}
  
/**
 * Transaccion para crear registro de asistencia en la parada
 * @param {org.effortium.transpo.reportaAsistencia} datosAbordaje
 * @transaction
 */
async function freportaAsistencia(datosAbordaje) {

    const NS =  'org.effortium.transpo';
    const registro ='.asistencia';


    // Obtener el registry para el asset.
    const assetRegistry = await getAssetRegistry(NS + registro);
    
    // Crea un objeto asset 'asistencia'  para registrar valores
    IdAsistencia=crearIDAsistencia(datosAbordaje.IdRuta,datosAbordaje.parada);
    var assetAsistencia = getFactory().newResource(NS,'asistencia',IdAsistencia);

    // Asigna valores recibidos al asset
    assetAsistencia.IdRuta = datosAbordaje.IdRuta;
    assetAsistencia.IdOperador = datosAbordaje.IdOperador;
    assetAsistencia.parada = datosAbordaje.parada;
    assetAsistencia.fabordaje = datosAbordaje.fabordaje;
    assetAsistencia.personal = datosAbordaje.personal;
    
    // Crear el asset en el registry 
    await assetRegistry.add(assetAsistencia);

    // Crea y emite el evento para la creación del asset 'asistencia'
    let evento = getFactory().newEvent(NS, 'reporteAbordaje');
    evento.IdRuta = datosAbordaje.IdRuta;
    evento.IdOperador = datosAbordaje.IdOperador;
    evento.parada = datosAbordaje.parada;
    evento.fabordaje = datosAbordaje.fabordaje;
    evento.personal = datosAbordaje.personal;
    emit(evento);
}




