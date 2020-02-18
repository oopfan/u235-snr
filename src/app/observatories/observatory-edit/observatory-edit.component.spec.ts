import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservatoryEditComponent } from './observatory-edit.component';

describe('ObservatoryEditComponent', () => {
  let component: ObservatoryEditComponent;
  let fixture: ComponentFixture<ObservatoryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservatoryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservatoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
