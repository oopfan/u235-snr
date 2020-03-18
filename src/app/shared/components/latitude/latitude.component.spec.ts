import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatitudeComponent } from './latitude.component';

describe('LatitudeComponent', () => {
  let component: LatitudeComponent;
  let fixture: ComponentFixture<LatitudeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatitudeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatitudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
