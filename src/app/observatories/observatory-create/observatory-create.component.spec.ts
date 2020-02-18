import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservatoryCreateComponent } from './observatory-create.component';

describe('ObservatoryCreateComponent', () => {
  let component: ObservatoryCreateComponent;
  let fixture: ComponentFixture<ObservatoryCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservatoryCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservatoryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
