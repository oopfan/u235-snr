import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CalculatorsModule } from '../../calculators.module';
import { routes } from '../../calculators-routing.module';
import { CalculatorsHomeComponent } from './calculators-home.component';

describe('CalculatorsHomeComponent', () => {
  let component: CalculatorsHomeComponent;
  let fixture: ComponentFixture<CalculatorsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes(routes), CalculatorsModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
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
