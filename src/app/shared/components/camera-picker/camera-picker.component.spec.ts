import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraPickerComponent } from './camera-picker.component';

describe('CameraPickerComponent', () => {
  let component: CameraPickerComponent;
  let fixture: ComponentFixture<CameraPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CameraPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
