import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.effortium.transpo{
   export class ruta extends Asset {
      IdRuta: string;
      IdOperador: string;
      paradas: string[];
      fInicio: Date;
      fFin: Date;
   }
   export class asistencia extends Asset {
      IdAsistencia: string;
      IdRuta: string;
      IdOperador: string;
      parada: string;
      fabordaje: Date;
      personal: string[];
   }
   export class crearRuta extends Transaction {
      IdRuta: string;
      IdOperador: string;
      paradas: string[];
   }
   export class rutaAsignada extends Event {
      IdRuta: string;
      IdOperador: string;
      paradas: string[];
   }
   export class reportaAsistencia extends Transaction {
      IdRuta: string;
      IdOperador: string;
      parada: string;
      fabordaje: Date;
      personal: string[];
   }
   export class reporteAbordaje extends Event {
      IdRuta: string;
      IdOperador: string;
      fabordaje: Date;
      personal: string[];
      parada: string;
   }
// }
