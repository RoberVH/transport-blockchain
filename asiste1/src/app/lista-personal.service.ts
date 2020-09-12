import { Injectable } from '@angular/core';

@Injectable()
export class ListaPersonalService {
  
    rutaId: string;
    IdOperador: string;
    parada: string;
    paradaReportada: string;
    paradasRuta: string[];
    personal: string [];
    mostrarPersonal:boolean=false;
    faltante:boolean=false;
    lfaltantes: string[]=[];
  
  constructor() { }

}
