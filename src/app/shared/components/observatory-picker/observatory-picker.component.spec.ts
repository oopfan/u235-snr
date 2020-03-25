import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservatoryPickerComponent } from './observatory-picker.component';

describe('ObservatoryPickerComponent', () => {
  let component: ObservatoryPickerComponent;
  let fixture: ComponentFixture<ObservatoryPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservatoryPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservatoryPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
