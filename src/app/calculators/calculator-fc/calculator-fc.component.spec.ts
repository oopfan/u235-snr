import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorFcComponent } from './calculator-fc.component';

describe('CalculatorFcComponent', () => {
  let component: CalculatorFcComponent;
  let fixture: ComponentFixture<CalculatorFcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculatorFcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorFcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
