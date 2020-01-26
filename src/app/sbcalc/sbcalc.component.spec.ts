import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SbcalcComponent } from './sbcalc.component';

describe('SbcalcComponent', () => {
  let component: SbcalcComponent;
  let fixture: ComponentFixture<SbcalcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SbcalcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SbcalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
