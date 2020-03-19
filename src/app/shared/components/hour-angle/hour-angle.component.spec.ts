import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HourAngleComponent } from './hour-angle.component';

describe('HourAngleComponent', () => {
  let component: HourAngleComponent;
  let fixture: ComponentFixture<HourAngleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HourAngleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HourAngleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
