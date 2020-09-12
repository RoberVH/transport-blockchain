import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../websocket.service';
import { ListaPersonalService } from '../lista-personal.service';

@Component({
  selector: 'app-avisos',
  templateUrl: './avisos.component.html',
  styleUrls: ['./avisos.component.css'],
  providers: [ WebsocketService]
})
export class AvisosComponent implements OnInit {
  today: number = Date.now();
  ws:WebSocket;
  eventosBC=[];
  private i: number = 0;
  constructor(private wsService: WebsocketService,public listaP: ListaPersonalService) {
    this.wsService.creaWSocket('ws://effortium.com:3000') 
    .subscribe(data => {this.eventosBC.push(this.convierte(data))})
   }

  ngOnInit() {
  }
  private convierte(data:any):string {
    // return 'Id Evento: ' + event.eventId + 'Package ID: ' + event.packingId + 'Fecha Cita: ' + event.fechaCita + 'Nombre Prov: ' + event.nombProveedor;
   
    const event=JSON.parse(data);

 
  switch (event.$class)
   {
    case "org.effortium.transpo.rutaAsignada":
          let paradas:string=" | ";
          let lparadas=[];
          for (let i=0; i< event.paradas.length;i++)
            { 
                paradas+=event.paradas[i] + " | ";
                lparadas.push(event.paradas[i])
            }
            this.listaP.rutaId=event.IdRuta;
            this.listaP.IdOperador=event.IdOperador;
            this.listaP.paradasRuta=lparadas;
            //console.log("lparadas: ",lparadas," listaP.paradasRuta= ",this.listaP.paradasRuta);
          return "Nueva Ruta: " + event.$class  + " Id Ruta: " + event.IdRuta + " Paradas: " + paradas;
    case "org.effortium.transpo.reporteAbordaje": 
          let personal:string=" | ";
          let aviso:string="";
          //Traslada personal de event.personal a personal para despliegue en Avisos, agrega "|" entre personas
          for (let i=0; i< event.personal.length;i++)
            { personal+=event.personal[i] + " | ";}

            if (this.listaP.mostrarPersonal){ // estamos esperando personas en Parada
              
              if (this.listaP.parada==event.parada) { // verifica si esta es la parada con personal adscrite
                for (let i=0; i < this.listaP.personal.length;i++){ //  verificar si personal falto
                  var j=event.personal.indexOf(this.listaP.personal[i]);
                  if (j<0){
                    //Alerta, this.lista.personal[i] no esta en la lista de abordaje
                    this.listaP.faltante=true;
                    this.listaP.lfaltantes.push(this.listaP.personal[i]);
                  }
                } 
              }

            }
          aviso= "Personal a bordo: " + event.$class + " Id Ruta: " +  event.IdRuta + " Operador: " + event.IdOperador + " Parada:  " + event.parada + " Personal: " + personal;
          return this.listaP.faltante ?  '¡ALERTA!. EMPLEADOS NO ABORDARON.' + aviso : aviso;
         
   }
  }
 
   private simpleFecha(fecha:Date):string{
     //console.log('Tipo de FechaCita ', typeof(fecha));
     //console.log('Fecha String: ', fecha);
     const fechaCita=new Date(fecha);
     //console.log('Fecha Date: ', fechaCita);
     return fechaCita.getDate() + '/' +  (fechaCita.getMonth() + 1) + '/' + fechaCita.getFullYear() + ' - ' +  fechaCita.getHours() + ':' + fechaCita.getMinutes(); 
   }
}
