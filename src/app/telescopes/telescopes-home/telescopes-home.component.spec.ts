import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TelescopesHomeComponent } from './telescopes-home.component';
import { routes } from '../telescopes-routing.module';

describe('TelescopesHomeComponent', () => {
  let component: TelescopesHomeComponent;
  let fixture: ComponentFixture<TelescopesHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ TelescopesHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelescopesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
