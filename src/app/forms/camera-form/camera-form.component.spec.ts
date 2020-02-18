import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraFormComponent } from './camera-form.component';

describe('CameraFormComponent', () => {
  let component: CameraFormComponent;
  let fixture: ComponentFixture<CameraFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CameraFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
