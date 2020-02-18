import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraCreateComponent } from './camera-create.component';

describe('CameraCreateComponent', () => {
  let component: CameraCreateComponent;
  let fixture: ComponentFixture<CameraCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CameraCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
