import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorsHomeComponent } from './calculators-home.component';

describe('CalculatorsHomeComponent', () => {
  let component: CalculatorsHomeComponent;
  let fixture: ComponentFixture<CalculatorsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
