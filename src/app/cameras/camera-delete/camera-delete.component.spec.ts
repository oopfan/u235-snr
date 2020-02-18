import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraDeleteComponent } from './camera-delete.component';

describe('CameraDeleteComponent', () => {
  let component: CameraDeleteComponent;
  let fixture: ComponentFixture<CameraDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CameraDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
