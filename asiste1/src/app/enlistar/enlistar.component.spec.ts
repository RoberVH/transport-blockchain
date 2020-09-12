import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnlistarComponent } from './enlistar.component';

describe('EnlistarComponent', () => {
  let component: EnlistarComponent;
  let fixture: ComponentFixture<EnlistarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnlistarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnlistarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
