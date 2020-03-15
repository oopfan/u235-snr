import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurfaceBrightnessCalculatorComponent } from './surface-brightness-calculator.component';

describe('SurfaceBrightnessCalculatorComponent', () => {
  let component: SurfaceBrightnessCalculatorComponent;
  let fixture: ComponentFixture<SurfaceBrightnessCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurfaceBrightnessCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurfaceBrightnessCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
