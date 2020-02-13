import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TargetsHomeComponent } from './targets-home.component';
import { routes } from '../targets-routing.module';

describe('TargetsHomeComponent', () => {
  let component: TargetsHomeComponent;
  let fixture: ComponentFixture<TargetsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ TargetsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
