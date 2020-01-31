import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorSnrComponent } from './calculator-snr.component';

describe('CalculatorSnrComponent', () => {
  let component: CalculatorSnrComponent;
  let fixture: ComponentFixture<CalculatorSnrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculatorSnrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorSnrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
