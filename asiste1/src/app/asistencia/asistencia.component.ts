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
import { asistenciaService } from './asistencia.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.css'],
  providers: [asistenciaService]
})
export class asistenciaComponent implements OnInit {

  myForm: FormGroup;

  allAssets;
  private asset;
  private currentId;
  errorMessage;

  IdAsistencia = new FormControl('', Validators.required);
  IdRuta = new FormControl('', Validators.required);
  IdOperador = new FormControl('', Validators.required);
  parada = new FormControl('', Validators.required);
  fabordaje = new FormControl('', Validators.required);
  personal = new FormControl('', Validators.required);

  constructor(public serviceasistencia: asistenciaService, fb: FormBuilder) {
    this.myForm = fb.group({
      IdAsistencia: this.IdAsistencia,
      IdRuta: this.IdRuta,
      IdOperador: this.IdOperador,
      parada: this.parada,
      fabordaje: this.fabordaje,
      personal: this.personal
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceasistencia.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
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
   * @param {String} name - the name of the asset field to update
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
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.effortium.transpo.asistencia',
      'IdAsistencia': this.IdAsistencia.value,
      'IdRuta': this.IdRuta.value,
      'IdOperador': this.IdOperador.value,
      'parada': this.parada.value,
      'fabordaje': this.fabordaje.value,
      'personal': this.personal.value
    };

    this.myForm.setValue({
      'IdAsistencia': null,
      'IdRuta': null,
      'IdOperador': null,
      'parada': null,
      'fabordaje': null,
      'personal': null
    });

    return this.serviceasistencia.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'IdAsistencia': null,
        'IdRuta': null,
        'IdOperador': null,
        'parada': null,
        'fabordaje': null,
        'personal': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.effortium.transpo.asistencia',
      'IdRuta': this.IdRuta.value,
      'IdOperador': this.IdOperador.value,
      'parada': this.parada.value,
      'fabordaje': this.fabordaje.value,
      'personal': this.personal.value
    };

    return this.serviceasistencia.updateAsset(form.get('IdAsistencia').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
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


  deleteAsset(): Promise<any> {

    return this.serviceasistencia.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
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

    return this.serviceasistencia.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'IdAsistencia': null,
        'IdRuta': null,
        'IdOperador': null,
        'parada': null,
        'fabordaje': null,
        'personal': null
      };

      if (result.IdAsistencia) {
        formObject.IdAsistencia = result.IdAsistencia;
      } else {
        formObject.IdAsistencia = null;
      }

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
      'IdAsistencia': null,
      'IdRuta': null,
      'IdOperador': null,
      'parada': null,
      'fabordaje': null,
      'personal': null
      });
  }

}
