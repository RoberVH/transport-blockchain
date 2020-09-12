import { Component, OnInit } from '@angular/core';
import { ListaPersonalService } from '../lista-personal.service';

@Component({
  selector: 'app-enlistar',
  templateUrl: './enlistar.component.html',
  styleUrls: ['./enlistar.component.css']
})
export class EnlistarComponent implements OnInit {
  personalAdscrito:string;
  
  constructor(public listaP: ListaPersonalService) { }

  ngOnInit() {
  }

  salvarParadas():void{
    this.listaP.personal= this.personalAdscrito.split(",");
    this.listaP.mostrarPersonal=true; // señala que estamos esperando empleados en parada
    
  }
  otraParada():void{
    this.listaP.personal=[];
    this.listaP.lfaltantes=[];
    this.listaP.mostrarPersonal=false;
    this.listaP.faltante=false;    
  }
}
