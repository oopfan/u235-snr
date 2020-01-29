import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraItemComponent } from './camera-item.component';

describe('CameraItemComponent', () => {
  let component: CameraItemComponent;
  let fixture: ComponentFixture<CameraItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CameraItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
