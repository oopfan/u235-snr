import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservatoryFormComponent } from './observatory-form.component';

describe('ObservatoryFormComponent', () => {
  let component: ObservatoryFormComponent;
  let fixture: ComponentFixture<ObservatoryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservatoryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservatoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
