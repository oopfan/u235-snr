import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CalculatorsHomeComponent } from './calculators-home.component';
import { routes } from '../calculators-routing.module';

describe('CalculatorsHomeComponent', () => {
  let component: CalculatorsHomeComponent;
  let fixture: ComponentFixture<CalculatorsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ CalculatorsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
