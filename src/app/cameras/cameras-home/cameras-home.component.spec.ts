import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CamerasHomeComponent } from './cameras-home.component';
import { routes } from '../cameras-routing.module';

describe('CamerasHomeComponent', () => {
  let component: CamerasHomeComponent;
  let fixture: ComponentFixture<CamerasHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ CamerasHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CamerasHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
