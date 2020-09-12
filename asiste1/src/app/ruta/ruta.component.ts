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
import { rutaService } from './ruta.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-ruta',
  templateUrl: './ruta.component.html',
  styleUrls: ['./ruta.component.css'],
  providers: [rutaService]
})
export class rutaComponent implements OnInit {

  myForm: FormGroup;

  allAssets;
  private asset;
  private currentId;
  errorMessage;

  IdRuta = new FormControl('', Validators.required);
  IdOperador = new FormControl('', Validators.required);
  paradas = new FormControl('', Validators.required);
  fInicio = new FormControl('', Validators.required);
  fFin = new FormControl('', Validators.required);

  constructor(public serviceruta: rutaService, fb: FormBuilder) {
    this.myForm = fb.group({
      IdRuta: this.IdRuta,
      IdOperador: this.IdOperador,
      paradas: this.paradas,
      fInicio: this.fInicio,
      fFin: this.fFin
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceruta.getAll()
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
      $class: 'org.effortium.transpo.ruta',
      'IdRuta': this.IdRuta.value,
      'IdOperador': this.IdOperador.value,
      'paradas': this.paradas.value,
      'fInicio': this.fInicio.value,
      'fFin': this.fFin.value
    };

    this.myForm.setValue({
      'IdRuta': null,
      'IdOperador': null,
      'paradas': null,
      'fInicio': null,
      'fFin': null
    });

    return this.serviceruta.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'IdRuta': null,
        'IdOperador': null,
        'paradas': null,
        'fInicio': null,
        'fFin': null
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
      $class: 'org.effortium.transpo.ruta',
      'IdOperador': this.IdOperador.value,
      'paradas': this.paradas.value,
      'fInicio': this.fInicio.value,
      'fFin': this.fFin.value
    };

    return this.serviceruta.updateAsset(form.get('IdRuta').value, this.asset)
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

    return this.serviceruta.deleteAsset(this.currentId)
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

    return this.serviceruta.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'IdRuta': null,
        'IdOperador': null,
        'paradas': null,
        'fInicio': null,
        'fFin': null
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

      if (result.paradas) {
        formObject.paradas = result.paradas;
      } else {
        formObject.paradas = null;
      }

      if (result.fInicio) {
        formObject.fInicio = result.fInicio;
      } else {
        formObject.fInicio = null;
      }

      if (result.fFin) {
        formObject.fFin = result.fFin;
      } else {
        formObject.fFin = null;
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
      'paradas': null,
      'fInicio': null,
      'fFin': null
      });
  }

}
