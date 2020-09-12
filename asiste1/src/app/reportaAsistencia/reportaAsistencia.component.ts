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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { reportaAsistenciaService } from './reportaAsistencia.service';
import { ListaPersonalService } from '../lista-personal.service';
import 'rxjs/add/operator/toPromise';



@Component({
  selector: 'app-reportaasistencia',
  templateUrl: './reportaAsistencia.component.html',
  styleUrls: ['./reportaAsistencia.component.css'],
  providers: [reportaAsistenciaService]
})
export class reportaAsistenciaComponent implements OnInit {

  myForm: FormGroup;

  private allTransactions;
  private Transaction;
  private currentId;
  errorMessage;

  IdRuta = new FormControl('', Validators.required);
  IdOperador = new FormControl('', Validators.required);
  parada = new FormControl('', Validators.required);
  fabordaje = new FormControl('', Validators.required);
  personal = new FormControl('', Validators.required);
  transactionId = new FormControl('', Validators.required);
  timestamp = new FormControl('', Validators.required);

  justoAhora:Date;

  constructor(private servicereportaAsistencia: reportaAsistenciaService, fb: FormBuilder,public listaP: ListaPersonalService) {
    this.myForm = fb.group({
      IdRuta: this.IdRuta,
      IdOperador: this.IdOperador,
      parada: this.parada,
      fabordaje: this.fabordaje,
      personal: this.personal,
      transactionId: this.transactionId,
      timestamp: this.timestamp
    });
    console.log('\nContructor  listaP.rutaId ',this.listaP.rutaId, '\n listaP.IdOperador ',this.listaP.IdOperador)
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.servicereportaAsistencia.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(transaction => {
        tempList.push(transaction);
      });
      this.allTransactions = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the transaction field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the transaction updateDialog.
   * @param {String} name - the name of the transaction field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified transaction field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addTransaction(form: any): Promise<any> {
    console.log('\nAdd Transac: listaP.paradaReportada: ',this.listaP.paradaReportada);
    this.Transaction = {
      $class: 'org.effortium.transpo.reportaAsistencia',
      'IdRuta': this.listaP.rutaId, //this.IdRuta.value,
      'IdOperador': this.listaP.IdOperador, //this.IdOperador.value,
      'parada': this.listaP.paradaReportada, //this.parada.value,
      'fabordaje': this.fabordaje.value,
      'personal': "[" + this.normalizalista(this.personal.value,",") + "]",  //lempleados,  //  this.personal.value,
      'transactionId': this.transactionId.value,
      'timestamp': this.timestamp.value
    };

    this.myForm.setValue({
      'IdRuta': null,
      'IdOperador': null,
      'parada': null,
      'fabordaje': null,
      'personal': null,
      'transactionId': null,
      'timestamp': null
    });

    return this.servicereportaAsistencia.addTransaction(this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'IdRuta': null,
        'IdOperador': null,
        'parada': null,
        'fabordaje': null,
        'personal': null,
        'transactionId': null,
        'timestamp': null
      });
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }

  updateTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'org.effortium.transpo.reportaAsistencia',
      'IdRuta': this.IdRuta.value,
      'IdOperador': this.IdOperador.value,
      'parada': this.parada.value,
      'fabordaje': this.fabordaje.value,
      'personal': this.personal.value,
      'timestamp': this.timestamp.value
    };

    return this.servicereportaAsistencia.updateTransaction(form.get('transactionId').value, this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
      this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  deleteTransaction(): Promise<any> {

    return this.servicereportaAsistencia.deleteTransaction(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.servicereportaAsistencia.getTransaction(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'IdRuta': null,
        'IdOperador': null,
        'parada': null,
        'fabordaje': null,
        'personal': null,
        'transactionId': null,
        'timestamp': null
      };

      if (result.IdRuta) {
        formObject.IdRuta = result.IdRuta;
      } else {
        formObject.IdRuta = null;
      }

      if (result.IdOperador) {
        formObject.IdOperador = result.IdOperador;
      } else {
        formObject.IdOperador = null;
      }

      if (result.parada) {
        formObject.parada = result.parada;
      } else {
        formObject.parada = null;
      }

      if (result.fabordaje) {
        formObject.fabordaje = result.fabordaje;
      } else {
        formObject.fabordaje = null;
      }

      if (result.personal) {
        formObject.personal = result.personal;
      } else {
        formObject.personal = null;
      }

      if (result.transactionId) {
        formObject.transactionId = result.transactionId;
      } else {
        formObject.transactionId = null;
      }

      if (result.timestamp) {
        formObject.timestamp = result.timestamp;
      } else {
        formObject.timestamp = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
      this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'IdRuta': null,
      'IdOperador': null,
      'parada': null,
      'fabordaje': null,
      'personal': null,
      'transactionId': null,
      'timestamp': null
    });
    this.justoAhora=new Date();
  }
  normalizalista(str,separador):string {
    let res = str.split(separador);
    let final="";
    for(let i=0;i<res.length;i++){
    	final+="\"" + res[i] + "\"";
        if ((i+1)<res.length){final+= ","}
    }
    return final;
  }
}
