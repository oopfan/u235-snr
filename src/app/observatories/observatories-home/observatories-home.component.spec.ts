import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ObservatoriesHomeComponent } from './observatories-home.component';
import { routes } from '../observatories-routing.module';

describe('ObservatoriesHomeComponent', () => {
  let component: ObservatoriesHomeComponent;
  let fixture: ComponentFixture<ObservatoriesHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ ObservatoriesHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservatoriesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
