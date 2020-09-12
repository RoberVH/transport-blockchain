import { TestBed, inject } from '@angular/core/testing';

import { ListaPersonalService } from './lista-personal.service';

describe('ListaPersonalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListaPersonalService]
    });
  });

  it('should ...', inject([ListaPersonalService], (service: ListaPersonalService) => {
    expect(service).toBeTruthy();
  }));
});
