import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservatoryDeleteComponent } from './observatory-delete.component';

describe('ObservatoryDeleteComponent', () => {
  let component: ObservatoryDeleteComponent;
  let fixture: ComponentFixture<ObservatoryDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservatoryDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservatoryDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
