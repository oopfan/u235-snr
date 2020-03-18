import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LongitudeComponent } from './longitude.component';

describe('LongitudeComponent', () => {
  let component: LongitudeComponent;
  let fixture: ComponentFixture<LongitudeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LongitudeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LongitudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
